"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Mail, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${window.location.origin}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...parsed.data,
          next: nextPath,
        }),
      });

      const raw = await res.text();
      let data: { ok?: boolean; needsEmailConfirmation?: boolean; error?: string | null } =
        {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        setStatus("error");
        setMessage("Bad response from server. Redeploy and check Vercel logs.");
        return;
      }

      if (!res.ok || !data.ok) {
        setStatus("error");
        let msg = data.error ?? "Sign up failed.";
        if (/already registered|already been registered|exists/i.test(msg)) {
          msg = "An account with this email already exists. Try logging in instead.";
        }
        setMessage(msg);
        return;
      }

      if (!data.needsEmailConfirmation) {
        router.push(nextPath);
        router.refresh();
        return;
      }

      setVerifyError("");
      setStatus("verify");
      setMessage(
        "We sent a verification link to your email. Open it to confirm your account — then you’ll continue to a few quick questions."
      );
    } catch {
      setStatus("error");
      setMessage(
        "Could not reach the server. Check your connection, or confirm the site URL / Supabase env on Vercel."
      );
    }
  }

  async function resendVerification() {
    if (!email.trim()) return;
    setResending(true);
    setVerifyError("");
    try {
      const res = await fetch(`${window.location.origin}/api/auth/resend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim().toLowerCase(), next: nextPath }),
      });
      const raw = await res.text();
      let data: { ok?: boolean; error?: string } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        setVerifyError("Invalid server response.");
        setResending(false);
        return;
      }
      if (!res.ok || !data.ok) {
        setVerifyError(data.error ?? "Could not resend.");
        setResending(false);
        return;
      }
      setMessage(
        "Another verification email is on its way. Check spam if you don’t see it."
      );
    } catch {
      setVerifyError("Network error.");
    }
    setResending(false);
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
          Sign-up runs on our server (works even if the browser can’t read Supabase
          keys). Verify your email when asked, then finish onboarding.
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
          Add your Vercel URL + <code className="text-white/45">/auth/callback</code>{" "}
          in Supabase → Authentication → Redirect URLs. Optional: set{" "}
          <code className="text-white/45">SITE_URL</code> on Vercel for email links.
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
