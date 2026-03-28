"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { SUPABASE_PUBLIC_ENV_HINT } from "@/lib/supabase/env";
import { loginPasswordSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

type Props = {
  initialError?: string;
  nextPath: string;
};

type AuthTab = "password" | "magic";

export function LoginForm({ initialError, nextPath }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<AuthTab>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>(
    {}
  );
  const [magicStatus, setMagicStatus] = useState<
    "idle" | "loading" | "sent" | "error"
  >(initialError ? "error" : "idle");
  const [passwordStatus, setPasswordStatus] = useState<"idle" | "loading" | "error">(
    "idle"
  );
  const [message, setMessage] = useState(
    initialError === "auth"
      ? "That sign-in link expired or is invalid. Request a new one."
      : initialError === "config"
        ? "Supabase is not configured yet. Add environment variables (see .env.example)."
        : ""
  );

  function callbackUrl() {
    return `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
  }

  async function onPasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setMessage("");

    const parsed = loginPasswordSchema.safeParse({ email, password });
    if (!parsed.success) {
      const err: Record<string, string> = {};
      for (const issue of parsed.error.errors) {
        const k = issue.path[0];
        if (typeof k === "string" && !err[k]) err[k] = issue.message;
      }
      setFieldErrors(err);
      return;
    }

    const supabase = createBrowserSupabase();
    if (!supabase) {
      setPasswordStatus("error");
      setMessage(SUPABASE_PUBLIC_ENV_HINT);
      return;
    }

    setPasswordStatus("loading");

    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      setPasswordStatus("error");
      let msg = error.message;
      if (/email not confirmed|not verified|confirm/i.test(msg)) {
        msg +=
          " Open the verification link we sent when you signed up, or use “Resend” from the sign-up page.";
      }
      if (/invalid login|invalid credentials/i.test(msg)) {
        msg = "Wrong email or password. Try again or use magic link.";
      }
      setMessage(msg);
      return;
    }

    router.push(nextPath);
    router.refresh();
  }

  async function onMagicSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setMagicStatus("error");
      setMessage(SUPABASE_PUBLIC_ENV_HINT);
      return;
    }

    setMagicStatus("loading");
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: callbackUrl(),
        shouldCreateUser: true,
      },
    });

    if (error) {
      setMagicStatus("error");
      let hint = error.message;
      if (/captcha|security|verify/i.test(error.message)) {
        hint +=
          " — In Supabase: Authentication → Bot Protection / CAPTCHA: turn it off for testing, or add captcha to this form.";
      }
      if (/redirect|url/i.test(error.message)) {
        hint +=
          " — Add this exact origin to Authentication → URL configuration → Redirect URLs: " +
          window.location.origin +
          "/auth/callback";
      }
      setMessage(hint);
      return;
    }

    setMagicStatus("sent");
    setMessage(
      "If an account exists (or sign-ups are allowed), Supabase sent a magic link. Check inbox and spam. Redirect URL must include " +
        window.location.origin +
        "/auth/callback"
    );
  }

  const showPasswordError = tab === "password" && passwordStatus === "error" && message;
  const showMagicError = tab === "magic" && magicStatus === "error" && message;
  const showMagicSuccess = tab === "magic" && magicStatus === "sent" && message;

  return (
    <div className="w-full max-w-md space-y-8 relative z-10">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-300/90">
          Welcome back
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">
          Log in
        </h1>
        <p className="text-white/45 text-sm leading-relaxed">
          Use your password, or a one-time magic link. New here?{" "}
          <Link
            href={`/signup?next=${encodeURIComponent(nextPath)}`}
            className="text-rose-300/90 hover:text-rose-200 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>

      <div
        className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1"
        role="tablist"
        aria-label="Sign-in method"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "password"}
          className={cn(
            "flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors",
            tab === "password"
              ? "bg-white/10 text-white shadow-sm"
              : "text-white/45 hover:text-white/70"
          )}
          onClick={() => {
            setTab("password");
            setMessage("");
            setMagicStatus("idle");
          }}
        >
          <span className="inline-flex items-center justify-center gap-1.5">
            <LogIn className="w-3.5 h-3.5" aria-hidden />
            Password
          </span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "magic"}
          className={cn(
            "flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors",
            tab === "magic"
              ? "bg-white/10 text-white shadow-sm"
              : "text-white/45 hover:text-white/70"
          )}
          onClick={() => {
            setTab("magic");
            setMessage("");
            setPasswordStatus("idle");
            setFieldErrors({});
          }}
        >
          <span className="inline-flex items-center justify-center gap-1.5">
            <Mail className="w-3.5 h-3.5" aria-hidden />
            Magic link
          </span>
        </button>
      </div>

      {tab === "password" ? (
        <form
          onSubmit={onPasswordSubmit}
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
              disabled={passwordStatus === "loading"}
              error={fieldErrors.email}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={passwordStatus === "loading"}
              error={fieldErrors.password}
            />
          </div>
          {showPasswordError && (
            <p className="text-red-400 text-sm" role="alert">
              {message}
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={passwordStatus === "loading"}
          >
            {passwordStatus === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />
                Signing in…
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" aria-hidden />
                Sign in
              </>
            )}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={onMagicSubmit}
          className="glass rounded-3xl p-8 border border-white/[0.1] space-y-5"
          noValidate
        >
          <div className="space-y-1.5">
            <Label htmlFor="magic-email">Email</Label>
            <Input
              id="magic-email"
              type="email"
              autoComplete="email"
              placeholder="you@college.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={magicStatus === "loading" || magicStatus === "sent"}
            />
          </div>
          {(showMagicError || showMagicSuccess) && (
            <p
              className={`text-sm ${showMagicError ? "text-red-400" : "text-emerald-400/90"}`}
              role={showMagicError ? "alert" : "status"}
            >
              {message}
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={
              magicStatus === "loading" || magicStatus === "sent" || !email.trim()
            }
          >
            {magicStatus === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />
                Sending link…
              </>
            ) : magicStatus === "sent" ? (
              "Link sent"
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" aria-hidden />
                Email me a magic link
              </>
            )}
          </Button>
          <p className="text-white/30 text-xs text-center leading-relaxed">
            Magic link works for sign-in and can create an account if your project
            allows it.
          </p>
        </form>
      )}

      <p className="text-center text-sm text-white/40">
        <Link href="/" className="text-rose-300/80 hover:text-rose-200 transition-colors">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
