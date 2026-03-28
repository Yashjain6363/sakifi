"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveOnboardingProfile } from "@/actions/onboarding";
import type { OnboardingPayload } from "@/lib/onboarding-schema";

type Step =
  | "intro"
  | "gender"
  | "female_mood"
  | "female_cravings"
  | "female_cycle"
  | "male_stress"
  | "male_sleep"
  | "male_movement"
  | "money"
  | "done";

type MoodId = NonNullable<
  NonNullable<NonNullable<OnboardingPayload["female"]>["moodPatterns"]>
>[number];
type CravingId = NonNullable<
  NonNullable<NonNullable<OnboardingPayload["female"]>["cravings"]>
>[number];
type CycleId = NonNullable<
  NonNullable<OnboardingPayload["female"]>["cycleRegularity"]
>;
type StressId = NonNullable<NonNullable<OnboardingPayload["male"]>["stressFocus"]>;
type SleepId = NonNullable<NonNullable<OnboardingPayload["male"]>["sleepQuality"]>;
type MoveId = NonNullable<
  NonNullable<OnboardingPayload["male"]>["movementLevel"]
>;
type MoneyId = NonNullable<OnboardingPayload["moneyComfort"]>;

const MOOD_OPTIONS: { id: MoodId; label: string }[] = [
  { id: "irritable_or_snappy", label: "Irritable or snappy" },
  { id: "low_energy", label: "Low energy" },
  { id: "anxious_or_wired", label: "Anxious or wired" },
  { id: "tearful_or_sensitive", label: "Tearful or sensitive" },
  { id: "mostly_stable", label: "Mostly stable" },
  { id: "prefer_not_to_say", label: "Prefer not to say" },
];

const CRAVING_OPTIONS: { id: CravingId; label: string }[] = [
  { id: "sweet", label: "Sweet" },
  { id: "salty", label: "Salty" },
  { id: "comfort_food", label: "Comfort food" },
  { id: "caffeine", label: "Caffeine" },
  { id: "varies_no_pattern", label: "Varies / no pattern" },
  { id: "prefer_not_to_say", label: "Prefer not to say" },
];

const CYCLE_OPTIONS: { id: CycleId; label: string }[] = [
  { id: "regular", label: "Fairly regular" },
  { id: "somewhat_irregular", label: "Somewhat irregular" },
  { id: "not_tracking", label: "Not tracking" },
  { id: "prefer_not_to_say", label: "Prefer not to say" },
];

const STRESS_OPTIONS: { id: StressId; label: string }[] = [
  { id: "academics", label: "Academics" },
  { id: "money", label: "Money" },
  { id: "relationships_social", label: "Relationships / social" },
  { id: "health_body", label: "Health / body" },
  { id: "future_career", label: "Future / career" },
  { id: "prefer_not_to_say", label: "Prefer not to say" },
];

const SLEEP_OPTIONS: { id: SleepId; label: string }[] = [
  { id: "great", label: "Sleeping well" },
  { id: "okay", label: "Okay" },
  { id: "poor", label: "Poor / restless" },
  { id: "prefer_not_to_say", label: "Prefer not to say" },
];

const MOVE_OPTIONS: { id: MoveId; label: string }[] = [
  { id: "very_active", label: "Very active" },
  { id: "moderate", label: "Moderate" },
  { id: "mostly_sedentary", label: "Mostly sedentary" },
  { id: "prefer_not_to_say", label: "Prefer not to say" },
];

const MONEY_OPTIONS: { id: MoneyId; label: string }[] = [
  { id: "under_5k", label: "Under ₹5k / month" },
  { id: "5k_to_15k", label: "₹5k – ₹15k" },
  { id: "15k_to_30k", label: "₹15k – ₹30k" },
  { id: "above_30k", label: "Above ₹30k" },
  { id: "prefer_not_to_say", label: "Prefer not to say" },
];

function bubble(text: string, isSakhi: boolean) {
  return (
    <div className={isSakhi ? "" : "flex justify-end"}>
      {isSakhi && (
        <p className="text-rose-300/80 text-[0.65rem] font-bold uppercase tracking-wider mb-1">
          Sakhi
        </p>
      )}
      <div
        className={`inline-block max-w-[95%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isSakhi
            ? "bg-rose-500/12 border border-rose-500/20 text-white/85 rounded-bl-md"
            : "bg-violet-500/18 border border-violet-500/20 text-white/80 rounded-br-md"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export function OnboardingChat() {
  const [step, setStep] = useState<Step>("intro");
  const [gender, setGender] = useState<OnboardingPayload["gender"] | null>(null);
  const [moods, setMoods] = useState<MoodId[]>([]);
  const [cravings, setCravings] = useState<CravingId[]>([]);
  const [cycle, setCycle] = useState<CycleId | undefined>();
  const [stress, setStress] = useState<StressId | undefined>();
  const [sleep, setSleep] = useState<SleepId | undefined>();
  const [movement, setMovement] = useState<MoveId | undefined>();
  const [money, setMoney] = useState<MoneyId | undefined>();
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  function toggleMulti<T extends string>(list: T[], id: T): T[] {
    if (list.includes(id)) return list.filter((x) => x !== id);
    return [...list, id];
  }

  function nextFromGender(g: OnboardingPayload["gender"]) {
    setGender(g);
    if (g === "female") setStep("female_mood");
    else if (g === "male") setStep("male_stress");
    else setStep("money");
  }

  async function finish() {
    if (!gender) return;
    setSaving(true);
    setSaveMsg("");
    const payload: OnboardingPayload = {
      gender,
      female:
        gender === "female"
          ? {
              moodPatterns: moods.length ? moods : undefined,
              cravings: cravings.length ? cravings : undefined,
              cycleRegularity: cycle,
            }
          : undefined,
      male:
        gender === "male"
          ? {
              stressFocus: stress,
              sleepQuality: sleep,
              movementLevel: movement,
            }
          : undefined,
      moneyComfort: money,
    };
    const res = await saveOnboardingProfile(payload);
    setSaving(false);
    if (res.success) {
      setSaveMsg(res.message);
      setStep("done");
    } else {
      setSaveMsg(res.message);
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className="rounded-3xl border border-white/[0.08] bg-obsidian-900/40 p-6 sm:p-8 min-h-[420px] flex flex-col">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5 flex-1 flex flex-col"
            >
              {bubble(
                "Hi — I'm Sakhi. A few quick questions help me tune money and wellness tips for you. Nothing here is shared publicly.",
                true
              )}
              <div className="flex-1" />
              <Button size="lg" className="w-full" onClick={() => setStep("gender")}>
                Let&apos;s go
                <Sparkles className="w-4 h-4 ml-2" aria-hidden />
              </Button>
            </motion.div>
          )}

          {step === "gender" && (
            <motion.div
              key="gender"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5"
            >
              {bubble(
                "For wellness features (like cycle-aware budgeting nudges), how should I personalize?",
                true
              )}
              <div className="flex flex-col gap-2">
                {(
                  [
                    ["female", "Girl / woman (period-aware tips)"],
                    ["male", "Boy / man (general wellness)"],
                    ["prefer_not_to_say", "Prefer not to say"],
                  ] as const
                ).map(([id, label]) => (
                  <Button
                    key={id}
                    type="button"
                    variant="outline"
                    className="justify-start h-auto py-3 px-4 text-left whitespace-normal"
                    onClick={() => nextFromGender(id)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "female_mood" && (
            <motion.div
              key="fm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {bubble(
                "Around your cycle, what mood shifts show up most? Pick any that fit — helps with gentle check-ins, not diagnoses.",
                true
              )}
              <div className="flex flex-wrap gap-2">
                {MOOD_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setMoods((m) => toggleMulti(m, o.id))}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                      moods.includes(o.id)
                        ? "bg-rose-500/25 border-rose-400/40 text-white"
                        : "bg-white/5 border-white/10 text-white/65 hover:border-white/20"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <Button size="lg" className="w-full" onClick={() => setStep("female_cravings")}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === "female_cravings" && (
            <motion.div
              key="fc"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {bubble(
                "Food cravings are common — which kinds do you notice? I’ll suggest budget-friendly swaps when it helps.",
                true
              )}
              <div className="flex flex-wrap gap-2">
                {CRAVING_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setCravings((c) => toggleMulti(c, o.id))}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                      cravings.includes(o.id)
                        ? "bg-rose-500/25 border-rose-400/40 text-white"
                        : "bg-white/5 border-white/10 text-white/65 hover:border-white/20"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <Button size="lg" className="w-full" onClick={() => setStep("female_cycle")}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === "female_cycle" && (
            <motion.div
              key="fcy"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {bubble("How regular is your cycle lately? Rough sense is enough.", true)}
              <div className="flex flex-col gap-2">
                {CYCLE_OPTIONS.map((o) => (
                  <Button
                    key={o.id}
                    type="button"
                    variant={cycle === o.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setCycle(o.id)}
                  >
                    {o.label}
                  </Button>
                ))}
              </div>
              <Button size="lg" className="w-full" onClick={() => setStep("money")}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === "male_stress" && (
            <motion.div
              key="ms"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {bubble("What tends to stress you most right now? I’ll weight tips toward that.", true)}
              <div className="flex flex-col gap-2">
                {STRESS_OPTIONS.map((o) => (
                  <Button
                    key={o.id}
                    type="button"
                    variant={stress === o.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setStress(o.id)}
                  >
                    {o.label}
                  </Button>
                ))}
              </div>
              <Button size="lg" className="w-full" onClick={() => setStep("male_sleep")}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === "male_sleep" && (
            <motion.div
              key="msl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {bubble("How’s your sleep been on average?", true)}
              <div className="flex flex-col gap-2">
                {SLEEP_OPTIONS.map((o) => (
                  <Button
                    key={o.id}
                    type="button"
                    variant={sleep === o.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSleep(o.id)}
                  >
                    {o.label}
                  </Button>
                ))}
              </div>
              <Button size="lg" className="w-full" onClick={() => setStep("male_movement")}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === "male_movement" && (
            <motion.div
              key="mm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {bubble("How would you describe movement or exercise lately?", true)}
              <div className="flex flex-col gap-2">
                {MOVE_OPTIONS.map((o) => (
                  <Button
                    key={o.id}
                    type="button"
                    variant={movement === o.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setMovement(o.id)}
                  >
                    {o.label}
                  </Button>
                ))}
              </div>
              <Button size="lg" className="w-full" onClick={() => setStep("money")}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === "money" && (
            <motion.div
              key="money"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {bubble(
                "Roughly, what monthly spending money do you usually work with? Ballpark is fine.",
                true
              )}
              <div className="flex flex-col gap-2">
                {MONEY_OPTIONS.map((o) => (
                  <Button
                    key={o.id}
                    type="button"
                    variant={money === o.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setMoney(o.id)}
                  >
                    {o.label}
                  </Button>
                ))}
              </div>
              {saveMsg && (
                <p className="text-red-400 text-sm" role="alert">
                  {saveMsg}
                </p>
              )}
              <Button
                size="lg"
                className="w-full"
                disabled={saving}
                onClick={() => void finish()}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />
                    Saving…
                  </>
                ) : (
                  "Save & finish"
                )}
              </Button>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5 text-center"
            >
              {bubble(
                saveMsg || "You're all set. I'll keep tips relevant and respectful.",
                true
              )}
              <Button asChild size="lg" className="w-full">
                <Link href="/">Back to home</Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center text-xs text-white/30">
        Health answers are for wellness-style coaching only, not medical advice.
      </p>
    </div>
  );
}
