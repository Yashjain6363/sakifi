import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Log in",
  description: `Sign in to ${SITE_CONFIG.name} with email.`,
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function LoginPage({ searchParams }: Props) {
  const err =
    typeof searchParams.error === "string" ? searchParams.error : undefined;
  const nextRaw = searchParams.next;
  const nextPath =
    typeof nextRaw === "string" && nextRaw.startsWith("/") && !nextRaw.startsWith("//")
      ? nextRaw
      : "/onboarding";

  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-4 py-20 bg-obsidian-DEFAULT relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-transparent to-violet-950/15 pointer-events-none"
        aria-hidden
      />
      <LoginForm initialError={err} nextPath={nextPath} />
    </main>
  );
}
