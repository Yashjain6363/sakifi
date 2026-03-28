import type { Metadata } from "next";
import { SignupForm } from "./SignupForm";
import { AuthPageChrome } from "@/components/auth/AuthPageChrome";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sign up",
  description: `Create your ${SITE_CONFIG.name} account — verify email, then personalize Sakhi.`,
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function SignupPage({ searchParams }: Props) {
  const nextRaw = searchParams.next;
  const nextPath =
    typeof nextRaw === "string" && nextRaw.startsWith("/") && !nextRaw.startsWith("//")
      ? nextRaw
      : "/onboarding";

  return (
    <AuthPageChrome variant="violet">
      <SignupForm nextPath={nextPath} />
    </AuthPageChrome>
  );
}
