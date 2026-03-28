"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Mail, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { SUPABASE_PUBLIC_ENV_HINT } from "@/lib/supabase/env";
import { signupSchema } from "@/lib/validations";

type Props = { nextPath: string };

export function SignupForm({ nextPath }: Props) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>(
    {}
  );
  const [status, setStatus] = useState<
    "idle" | "loading" | "verify" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [resending, setResending] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  function callbackUrl() {
    return `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});

    const parsed = signupSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
    });

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
      setStatus("error");
      setMessage(SUPABASE_PUBLIC_ENV_HINT);
      return;
    }

    setStatus("loading");
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: callbackUrl(),
        data: {
          full_name: parsed.data.fullName ?? "",
        },
      },
    });

    if (error) {
      setStatus("error");
      let msg = error.message;
      if (/already registered|already been registered|exists/i.test(msg)) {
        msg = "An account with this email already exists. Try logging in instead.";
      }
      setMessage(msg);
      return;
    }

    if (data.session) {
      router.push(nextPath);
      router.refresh();
      return;
    }

    setVerifyError("");
    setStatus("verify");
    setMessage(
      "We sent a verification link to your email. Open it to confirm your account — then you’ll continue to a few quick questions."
    );
  }

  async function resendVerification() {
    const supabase = createBrowserSupabase();
    if (!supabase || !email.trim()) return;
    setResending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: callbackUrl() },
    });
    setResending(false);
    if (error) {
      setVerifyError(error.message);
      return;
    }
    setVerifyError("");
    setMessage(
      "Another verification email is on its way. Check spam if you don’t see it."
    );
  }

  if (status === "verify") {
    return (
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-300/90">
            Check your email
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">
            Verify to continue
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">{message}</p>
        </div>
        {verifyError && (
          <p className="text-red-400 text-sm text-center" role="alert">
            {verifyError}
          </p>
        )}
        <div className="glass rounded-3xl p-8 border border-white/[0.1] space-y-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center mx-auto">
            <Mail className="w-7 h-7 text-violet-300" aria-hidden />
          </div>
          <p className="text-white/40 text-sm">
            Sent to <span className="text-white/70">{email}</span>
          </p>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={resending}
            onClick={() => void resendVerification()}
          >
            {resending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />
                Sending…
              </>
            ) : (
              "Resend verification email"
            )}
          </Button>
          <Button asChild variant="ghost" className="w-full text-white/50">
            <Link href="/login">Back to log in</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8 relative z-10">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-300/90">
          Create account
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">
          Sign up for SakhiFi
        </h1>
        <p className="text-white/45 text-sm leading-relaxed">
          Verify your email, then answer a short onboarding chat so Sakhi fits
          your life.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="glass rounded-3xl p-8 border border-white/[0.1] space-y-4"
        noValidate
      >
        <div className="space-y-1.5">
          <Label htmlFor="signup-name">Name (optional)</Label>
          <Input
            id="signup-name"
            autoComplete="name"
            placeholder="Ananya Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={status === "loading"}
            error={fieldErrors.fullName}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="you@college.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            error={fieldErrors.email}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={status === "loading"}
            error={fieldErrors.password}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-confirm">Confirm password</Label>
          <Input
            id="signup-confirm"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={status === "loading"}
            error={fieldErrors.confirmPassword}
          />
        </div>

        {message && status === "error" && (
          <p className="text-red-400 text-sm" role="alert">
            {message}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />
              Creating account…
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" aria-hidden />
              Sign up & verify email
            </>
          )}
        </Button>

        <p className="text-white/30 text-xs text-center leading-relaxed">
          With email confirmation on in Supabase, you must click the link in
          your inbox before your session starts. Redirect URL:{" "}
          <code className="text-white/45">/auth/callback</code>
        </p>
      </form>

      <p className="text-center text-sm text-white/45">
        Already have an account?{" "}
        <Link
          href={`/login?next=${encodeURIComponent(nextPath)}`}
          className="text-rose-300/90 hover:text-rose-200 transition-colors font-medium"
        >
          Log in
        </Link>
      </p>

      <p className="text-center text-sm text-white/40">
        <Link href="/" className="text-white/50 hover:text-white/70 transition-colors">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
