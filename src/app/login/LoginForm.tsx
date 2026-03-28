"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBrowserSupabase } from "@/lib/supabase/client";

type Props = {
  initialError?: string;
  nextPath: string;
};

export function LoginForm({ initialError, nextPath }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    initialError ? "error" : "idle"
  );
  const [message, setMessage] = useState(
    initialError === "auth"
      ? "That sign-in link expired or is invalid. Request a new one."
      : initialError === "config"
        ? "Supabase is not configured yet. Add environment variables (see .env.example)."
        : ""
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setStatus("error");
      setMessage(
        "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
      );
      return;
    }

    setStatus("loading");
    setMessage("");

    const redirect = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: redirect },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("sent");
    setMessage("Check your inbox for the magic link. You can close this tab.");
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-300/90">
          Sign in
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">
          Continue with email
        </h1>
        <p className="text-white/45 text-sm leading-relaxed">
          We&apos;ll email you a secure link — no password to remember. After you
          verify, Sakhi asks a few quick questions so tips fit you.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="glass rounded-3xl p-8 border border-white/[0.1] space-y-5"
        noValidate
      >
        <div className="space-y-1.5">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@college.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading" || status === "sent"}
          />
        </div>

        {message && (
          <p
            className={`text-sm ${status === "error" ? "text-red-400" : "text-emerald-400/90"}`}
            role={status === "error" ? "alert" : "status"}
          >
            {message}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === "loading" || status === "sent" || !email.trim()}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />
              Sending link…
            </>
          ) : status === "sent" ? (
            "Link sent"
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" aria-hidden />
              Email me a magic link
            </>
          )}
        </Button>

        <p className="text-white/30 text-xs text-center leading-relaxed">
          In Supabase: enable the Email provider, turn on email confirmations if
          you want verification, and add your site URL plus{" "}
          <code className="text-white/50">/auth/callback</code> under Authentication
          → URL configuration → Redirect URLs.
        </p>
      </form>

      <p className="text-center text-sm text-white/40">
        <Link href="/" className="text-rose-300/80 hover:text-rose-200 transition-colors">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
