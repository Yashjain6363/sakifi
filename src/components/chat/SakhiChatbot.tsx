"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Role = "user" | "assistant";

type ChatMessage = { role: Role; content: string };

const WELCOME_TEXT =
  "Hi, I’m Sakhi. Ask me about budgeting, saving, or money stress — or how you’re feeling around your cycle, mood, and cravings. I’ll suggest kind, budget-friendly ideas (this isn’t medical advice).";

export function SakhiChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, loading]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    const nextUser: ChatMessage = { role: "user", content: text };
    const forApi: ChatMessage[] = [...messages, nextUser];
    setMessages(forApi);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: forApi.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Could not reach Sakhi. Try again.");
        setMessages((prev) => prev.slice(0, -1));
        return;
      }

      if (!data.reply) {
        setError("Empty reply. Try again.");
        setMessages((prev) => prev.slice(0, -1));
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply! },
      ]);
    } catch {
      setError("Network error. Check your connection.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  return (
    <>
      <div
        className={cn(
          "fixed z-[140] flex flex-col items-end gap-3",
          "bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]"
        )}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className={cn(
                "w-[min(100vw-2rem,22rem)] sm:w-[24rem]",
                "h-[min(70dvh,32rem)] flex flex-col overflow-hidden",
                "rounded-2xl border border-white/[0.12] bg-obsidian-900/95 backdrop-blur-xl shadow-2xl shadow-rose-900/20"
              )}
              role="dialog"
              aria-label="Sakhi chat"
            >
              <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/[0.08] bg-gradient-to-r from-rose-500/10 to-violet-500/10">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 border border-rose-400/25">
                    <Sparkles className="h-4 w-4 text-rose-200" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      Ask Sakhi
                    </p>
                    <p className="text-[0.65rem] text-white/40 truncate">
                      Finance · mood · cravings (India)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth"
              >
                {messages.length === 0 && (
                  <div className="flex justify-start">
                    <div className="max-w-[92%] rounded-2xl rounded-bl-md px-3 py-2 text-[0.8125rem] leading-relaxed bg-white/[0.06] text-white/80 border border-white/[0.08]">
                      {WELCOME_TEXT}
                    </div>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex",
                      m.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[92%] rounded-2xl px-3 py-2 text-[0.8125rem] leading-relaxed",
                        m.role === "user"
                          ? "bg-violet-500/25 text-white/90 border border-violet-400/20 rounded-br-md"
                          : "bg-white/[0.06] text-white/80 border border-white/[0.08] rounded-bl-md"
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-white/[0.06] border border-white/[0.08] text-white/50 text-xs">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Sakhi is thinking…
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <p className="px-3 pb-1 text-xs text-red-400/90" role="alert">
                  {error}
                </p>
              )}

              <p className="px-3 text-[0.65rem] text-white/35 leading-snug">
                Not medical or investment advice. For emergencies, contact a
                professional.
              </p>

              <form
                className="p-3 pt-2 border-t border-white/[0.08] flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send();
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Sakhi…"
                  disabled={loading}
                  maxLength={2000}
                  className="flex-1 h-11 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  aria-label="Message"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={loading || !input.trim()}
                  className="h-11 w-11 shrink-0 rounded-xl"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          layout
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg flex items-center justify-center",
            "bg-gradient-to-br from-rose-500 to-violet-600 text-white",
            "border border-white/20 hover:opacity-95 active:scale-[0.98] transition-transform",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-DEFAULT"
          )}
          aria-expanded={open}
          aria-label={open ? "Close Sakhi chat" : "Open Sakhi chat"}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <MessageCircle className="h-6 w-6" aria-hidden />
          )}
        </motion.button>
      </div>
    </>
  );
}
