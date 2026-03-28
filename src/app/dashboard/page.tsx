import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabasePublicEnv, isValidSupabaseEnv } from "@/lib/supabase/env";
import { SITE_CONFIG } from "@/lib/constants";
import { SITE_FEATURE_LINKS } from "@/lib/dashboard-links";
import { DashboardWelcomeStrip } from "./DashboardWelcomeStrip";
import { Navbar } from "@/components/layout/Navbar";
import { BudgetSection } from "@/components/budget/BudgetSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Your ${SITE_CONFIG.name} plan, reports, and shortcuts.`,
};

type OnboardingStored = {
  profileComplete?: boolean;
  salaryMonthlyInr?: number;
  sipMonthlyInr?: number;
  investmentGoal?: string;
  lastPeriodDate?: string;
  computed?: {
    planSummary?: string;
    nextPeriodEstimateIso?: string;
    cycleDaysUsed?: number;
    recommendedSipInr?: number;
    planNote?: string;
    foodSuggestions?: string[];
  };
};

function parseOnboarding(raw: unknown): OnboardingStored | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  return raw as OnboardingStored;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { welcome?: string };
}) {
  const { url: sbUrl, key: sbKey } = getSupabasePublicEnv();
  if (!isValidSupabaseEnv(sbUrl, sbKey)) {
    redirect("/login?error=config");
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding")
    .eq("id", user.id)
    .maybeSingle();

  const ob = parseOnboarding(profile?.onboarding);
  const hasReport = ob?.profileComplete === true;
  const computed = ob?.computed;

  const greetingName =
    user.email?.split("@")[0] ||
    (typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name.split(" ")[0]
      : null);

  const showWelcome = searchParams.welcome === "1";

  return (
    <>
      <Navbar />
      <main className="min-h-[100dvh] px-4 pt-24 pb-16 bg-obsidian-DEFAULT relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-rose-950/10 pointer-events-none"
          aria-hidden
        />
        <div className="relative max-w-4xl mx-auto space-y-8">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-300/90">
              Dashboard
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">
              Hi{greetingName ? `, ${greetingName}` : ""}
            </h1>
            <p className="text-white/50 text-sm max-w-xl">
              Your saved plan and shortcuts to everything on SakhiFi. The chat
              (bottom-right) uses the local Sakhi engine — no API keys required.
            </p>
          </header>

          <DashboardWelcomeStrip showWelcome={showWelcome} />

          <BudgetSection />

          {!hasReport && (
            <div className="rounded-2xl border border-amber-500/25 bg-amber-950/25 px-4 py-4 text-sm text-amber-100/90">
              <p className="font-medium text-white mb-1">Finish setup</p>
              <p className="text-amber-100/75 mb-3">
                Complete onboarding to generate your personalised plan report.
              </p>
              <Link
                href="/onboarding"
                className="inline-flex text-amber-200 underline underline-offset-4 hover:text-white"
              >
                Continue onboarding →
              </Link>
            </div>
          )}

          {hasReport && (
            <section className="space-y-4" aria-labelledby="report-heading">
              <h2 id="report-heading" className="text-lg font-semibold text-white">
                Your plan report
              </h2>
              {!computed && (
                <p className="text-sm text-white/55">
                  Your profile is saved. Open{" "}
                  <Link href="/onboarding?edit=1" className="text-violet-300 underline">
                    setup again
                  </Link>{" "}
                  to refresh numbers and the full summary.
                </p>
              )}
              {computed && (
              <div className="rounded-2xl border border-white/[0.08] bg-obsidian-900/50 p-5 sm:p-6 space-y-4">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {typeof ob?.salaryMonthlyInr === "number" && (
                    <div>
                      <dt className="text-white/45">Money in hand (monthly)</dt>
                      <dd className="text-white font-medium">
                        ₹{ob.salaryMonthlyInr.toLocaleString("en-IN")}
                      </dd>
                    </div>
                  )}
                  {typeof ob?.sipMonthlyInr === "number" && (
                    <div>
                      <dt className="text-white/45">SIP (chosen)</dt>
                      <dd className="text-white font-medium">
                        ₹{ob.sipMonthlyInr.toLocaleString("en-IN")}/mo
                      </dd>
                    </div>
                  )}
                  {ob?.investmentGoal && (
                    <div>
                      <dt className="text-white/45">Goal</dt>
                      <dd className="text-white font-medium capitalize">
                        {ob.investmentGoal.replace(/_/g, " ")}
                      </dd>
                    </div>
                  )}
                  {computed.nextPeriodEstimateIso && (
                    <div>
                      <dt className="text-white/45">Next period (estimate)</dt>
                      <dd className="text-white font-medium">
                        {computed.nextPeriodEstimateIso}
                      </dd>
                    </div>
                  )}
                  {typeof computed.recommendedSipInr === "number" && (
                    <div>
                      <dt className="text-white/45">Rule-of-thumb SIP hint</dt>
                      <dd className="text-white font-medium">
                        ~₹{computed.recommendedSipInr.toLocaleString("en-IN")}/mo
                        {computed.planNote ? ` — ${computed.planNote}` : ""}
                      </dd>
                    </div>
                  )}
                </dl>

                {computed.foodSuggestions && computed.foodSuggestions.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-300/80 mb-2">
                      Food ideas (cravings)
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-white/75 space-y-1">
                      {computed.foodSuggestions.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {computed.planSummary && (
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80 mb-2">
                      Full summary
                    </h3>
                    <pre className="whitespace-pre-wrap text-sm text-white/70 font-sans leading-relaxed">
                      {computed.planSummary}
                    </pre>
                  </div>
                )}
              </div>
              )}
            </section>
          )}

          <section className="space-y-4" aria-labelledby="features-heading">
            <h2 id="features-heading" className="text-lg font-semibold text-white">
              Every feature on the site
            </h2>
            <p className="text-sm text-white/45">
              Jump to a section on the homepage — you stay logged in.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SITE_FEATURE_LINKS.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 p-4 transition-colors group"
                  >
                    <span className="text-xl" aria-hidden>
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-white group-hover:text-rose-100">
                        {item.label}
                      </span>
                      <span className="block text-xs text-white/45 mt-0.5">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/[0.06]">
            <Link
              href="/onboarding?edit=1"
              className="text-sm text-violet-300/90 hover:text-violet-200 underline underline-offset-4"
            >
              Update profile / re-run setup
            </Link>
            <span className="text-white/25">·</span>
            <Link href="/" className="text-sm text-white/50 hover:text-white/80">
              ← Marketing home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
