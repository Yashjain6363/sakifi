import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OnboardingChat } from "./OnboardingChat";
import { createClient } from "@/lib/supabase/server";
import { getSupabasePublicEnv, isValidSupabaseEnv } from "@/lib/supabase/env";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your profile",
  description: `Personalize ${SITE_CONFIG.name} in a few steps.`,
};

export default async function OnboardingPage() {
  const { url: sbUrl, key: sbKey } = getSupabasePublicEnv();
  if (!isValidSupabaseEnv(sbUrl, sbKey)) {
    redirect("/login?error=config");
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/onboarding");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("onboarding")
    .eq("id", user.id)
    .maybeSingle();

  const ob = profile?.onboarding;
  const onboardingDone =
    !profileError &&
    ob &&
    typeof ob === "object" &&
    !Array.isArray(ob) &&
    "profileComplete" in ob &&
    (ob as { profileComplete?: boolean }).profileComplete === true;

  if (onboardingDone) {
    redirect("/?welcome=1");
  }

  const greetingName =
    user.email?.split("@")[0] ||
    (typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name.split(" ")[0]
      : null) ||
    (typeof user.user_metadata?.name === "string"
      ? String(user.user_metadata.name).split(" ")[0]
      : null);

  return (
    <main className="min-h-[100dvh] px-4 py-24 bg-obsidian-DEFAULT relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-violet-950/15 via-transparent to-rose-950/10 pointer-events-none"
        aria-hidden
      />
      <div className="relative max-w-3xl mx-auto text-center mb-10 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet-300/90">
          Welcome{greetingName ? `, ${greetingName}` : ""}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">
          Let Sakhi learn your rhythm
        </h1>
        <p className="text-white/45 text-sm max-w-md mx-auto">
          A short, private chat so budgeting and wellness nudges match how you
          actually feel — whether you track cycles or not.
        </p>
      </div>
      <OnboardingChat />
    </main>
  );
}
