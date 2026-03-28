"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        ? "Supabase is not configured on the server. Add env vars on Vercel and redeploy."
        : ""
  );

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

    setPasswordStatus("loading");

    try {
      const res = await fetch(`${window.location.origin}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...parsed.data, next: nextPath }),
      });
      const raw = await res.text();
      let data: { ok?: boolean; error?: string | null } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        setPasswordStatus("error");
        setMessage("Bad response from server. Check Vercel logs.");
        return;
      }

      if (!res.ok || !data.ok) {
        setPasswordStatus("error");
        let msg = data.error ?? "Sign in failed.";
        if (/email not confirmed|not verified|confirm/i.test(msg)) {
          msg +=
            " Open the verification link we sent when you signed up, or use “Resend” on the sign-up page.";
        }
        if (/invalid login|invalid credentials|invalid/i.test(msg)) {
          msg = "Wrong email or password. Try again or use magic link.";
        }
        setMessage(msg);
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setPasswordStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  async function onMagicSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMagicStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${window.location.origin}/api/auth/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          next: nextPath,
        }),
      });
      const raw = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        setMagicStatus("error");
        setMessage("Bad response from server.");
        return;
      }

      if (!res.ok || !data.ok) {
        setMagicStatus("error");
        let hint = data.error ?? "Could not send link.";
        if (/captcha|security|verify/i.test(hint)) {
          hint +=
            " — In Supabase: turn off CAPTCHA for email or configure it.";
        }
        if (/redirect|url/i.test(hint)) {
          hint +=
            " — Add your site URL + /auth/callback under Supabase Redirect URLs.";
        }
        setMessage(hint);
        return;
      }

      setMagicStatus("sent");
      setMessage(
        "Check your inbox (and spam) for the magic link. Redirect URL in Supabase must include /auth/callback for this site."
      );
    } catch {
      setMagicStatus("error");
      setMessage("Network error.");
    }
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
          Password and magic link use the server — no Supabase keys needed in the
          browser. New here?{" "}
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
          onSubmit={(e) => void onPasswordSubmit(e)}
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
          onSubmit={(e) => void onMagicSubmit(e)}
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
            Magic link is sent from our server using your Supabase project settings.
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
