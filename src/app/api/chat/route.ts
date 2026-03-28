import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { SAKHI_CHAT_SYSTEM_INSTRUCTION } from "@/lib/sakhi-chat-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(4000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(36),
});

function sanitizeText(s: string): string {
  return s.replace(/\0/g, "").trim().slice(0, 4000);
}

function validateAlternatingUserEnds(
  messages: z.infer<typeof bodySchema>["messages"]
): boolean {
  if (messages.length === 0) return false;
  if (messages[0].role !== "user") return false;
  if (messages[messages.length - 1].role !== "user") return false;
  for (let i = 0; i < messages.length; i++) {
    const want: "user" | "assistant" = i % 2 === 0 ? "user" : "assistant";
    if (messages[i].role !== want) return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelId = process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Chat is not configured. Add GEMINI_API_KEY to .env.local (server-only, never NEXT_PUBLIC).",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid request" },
      { status: 422 }
    );
  }

  const { messages } = parsed.data;
  const cleaned = messages.map((m) => ({
    role: m.role,
    content: sanitizeText(m.content),
  }));

  if (!cleaned.every((m) => m.content.length > 0)) {
    return NextResponse.json({ error: "Empty message" }, { status: 422 });
  }

  if (!validateAlternatingUserEnds(cleaned)) {
    return NextResponse.json(
      { error: "Messages must alternate user/assistant and end with user." },
      { status: 422 }
    );
  }

  const lastUser = cleaned[cleaned.length - 1].content;
  const history = cleaned.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: m.content }],
  }));

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelId,
      systemInstruction: SAKHI_CHAT_SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastUser);
    const text = result.response.text();

    if (!text?.trim()) {
      return NextResponse.json(
        { error: "No response from model. Try again or check GEMINI_MODEL." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { reply: text.trim() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Chat failed";
    console.error("[api/chat]", msg);
    return NextResponse.json(
      {
        error:
          msg.includes("404") || msg.includes("not found")
            ? `Model "${modelId}" may be unavailable. Set GEMINI_MODEL to gemini-1.5-flash in .env.local.`
            : "Something went wrong. Try again in a moment.",
      },
      { status: 502 }
    );
  }
}
