import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { AuthPageChrome } from "@/components/auth/AuthPageChrome";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Log in",
  description: `Sign in to ${SITE_CONFIG.name} with password or magic link.`,
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
    <AuthPageChrome variant="rose">
      <LoginForm initialError={err} nextPath={nextPath} />
    </AuthPageChrome>
  );
}
