"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import {
  staggerContainerVariants,
  fadeUpVariants,
  slideInLeftVariants,
  slideInRightVariants,
  defaultViewport,
} from "@/lib/animations";

const PERIOD_FEATURES = [
  {
    icon: "🔄",
    colorClass: "bg-pink-500/15",
    title: "Cycle-Aware Budgeting",
    description: "Sakhi adjusts your spending recommendations based on where you are in your cycle.",
  },
  {
    icon: "🍫",
    colorClass: "bg-rose-500/12",
    title: "Craving Manager",
    description: "Log cravings and get budget-friendly healthy alternatives that satisfy without overspending.",
  },
  {
    icon: "🧘",
    colorClass: "bg-violet-500/12",
    title: "Self-Care Budget",
    description: "Auto-allocated self-care budget that scales with your cycle — guilt-free comfort spending, planned ahead.",
  },
  {
    icon: "💊",
    colorClass: "bg-teal-500/12",
    title: "Wellness Reminders",
    description: "Timely reminders for supplements, hydration goals, and comfort items before symptoms peak.",
  },
  {
    icon: "📊",
    colorClass: "bg-amber-500/12",
    title: "Mood-Expense Insights",
    description: "Correlates spending patterns with cycle phases — understand your money personality better.",
  },
];

const CRAVING_CHIPS = [
  { label: "🍫 Chocolate", active: true },
  { label: "🧁 Sweet", active: false },
  { label: "🍿 Salty", active: true },
  { label: "☕ Caffeine", active: false },
  { label: "🍦 Cold", active: false },
];

const RECO_ITEMS = [
  { emoji: "🥜", name: "Dark Choco Trail Mix", why: "Satisfies chocolate craving", price: "₹45", badge: "Budget-Fit", badgeClass: "bg-emerald-500/15 text-emerald-300" },
  { emoji: "🍵", name: "Ginger Turmeric Tea", why: "Reduces bloating & cramps", price: "₹15", badge: "Self-Care", badgeClass: "bg-pink-500/15 text-pink-300" },
  { emoji: "🍌", name: "Banana Smoothie", why: "Potassium + energy boost", price: "₹30", badge: "Budget-Fit", badgeClass: "bg-emerald-500/15 text-emerald-300" },
];

export function PeriodWellness() {
  return (
    <section
      id="period-wellness"
      aria-label="Period wellness companion"
      className="relative py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/8 to-transparent" />
      <GlowOrb color="pink" size="xl" className="-top-20 -right-24" intensity="low" />
      <GlowOrb color="violet" size="lg" className="bottom-20 -left-16" intensity="low" />

      <div className="relative container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-16"
        >
          {/* Layout: left text + right phone mockup */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left side — text and features */}
            <motion.div variants={slideInLeftVariants} className="flex-1 space-y-6 min-w-0">
              <SectionLabel variant="rose" className="justify-start">
                🌸 Period Wellness
              </SectionLabel>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance">
                Your cycle, your budget,{" "}
                <span className="text-gradient-rose">perfectly in sync</span>
              </h2>
              <p className="text-white/50 text-lg font-light leading-relaxed max-w-lg">
                Sakhi understands that wellness isn&apos;t generic. It tracks your cycle, manages cravings,
                and plans budget-friendly self-care — so you never have to choose between comfort and savings.
              </p>

              {/* Feature items */}
              <div className="space-y-3 pt-2">
                {PERIOD_FEATURES.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={fadeUpVariants}
                    className="flex items-start gap-4 glass rounded-xl p-4 border border-white/[0.06] hover:border-pink-500/15 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${feature.colorClass} flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-0.5">{feature.title}</h4>
                      <p className="text-white/45 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side — phone mockup */}
            <motion.div variants={slideInRightVariants} className="flex-shrink-0">
              <div className="relative">
                {/* Phone shell */}
                <div className="w-[280px] h-[560px] bg-gradient-to-b from-[#2D0A20] to-[#1A0A2E] rounded-[38px] p-3 shadow-2xl shadow-pink-900/20 border border-pink-500/10">
                  <div className="w-full h-full bg-gradient-to-b from-[#200A18] to-[#0D0A2E] rounded-[28px] overflow-hidden flex flex-col">
                    {/* Notch */}
                    <div className="flex justify-center">
                      <div className="w-20 h-6 bg-[#200A18] rounded-b-2xl" />
                    </div>

                    {/* Header */}
                    <div className="px-4 pt-3 pb-2 bg-gradient-to-b from-pink-900/20 to-transparent flex items-center justify-between">
                      <div>
                        <p className="text-white text-xs font-semibold font-display">Period Wellness</p>
                        <p className="text-pink-300/50 text-[0.55rem]">Cycle Day 14 • Ovulation Phase</p>
                      </div>
                      <span className="text-lg">🌸</span>
                    </div>

                    {/* Cycle Ring */}
                    <div className="flex justify-center py-3">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 -rotate-90">
                          <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
                          <circle
                            cx="48" cy="48" r="40" fill="none"
                            stroke="url(#pinkGradDef)" strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray="251" strokeDashoffset="75"
                          />
                          <defs>
                            <linearGradient id="pinkGradDef" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#EC4899" />
                              <stop offset="100%" stopColor="#F9A8D4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-white font-display text-2xl font-bold leading-none">14</span>
                          <span className="text-pink-300/50 text-[0.5rem] uppercase tracking-wide font-semibold">Day</span>
                        </div>
                      </div>
                    </div>

                    {/* Phase indicator */}
                    <div className="text-center mb-2">
                      <span className="text-pink-400 text-[0.6rem] font-bold uppercase tracking-wider">Ovulation Phase</span>
                    </div>

                    {/* Phase strip */}
                    <div className="flex gap-1 mx-3 mb-3">
                      <div className="h-1.5 rounded-full flex-1 bg-gradient-to-r from-rose-500 to-pink-400" />
                      <div className="h-1.5 rounded-full flex-1 bg-gradient-to-r from-pink-400 to-violet-300 shadow-sm shadow-pink-500/30" />
                      <div className="h-1.5 rounded-full flex-1 bg-white/10" />
                      <div className="h-1.5 rounded-full flex-1 bg-white/5" />
                    </div>

                    {/* Cravings */}
                    <div className="px-3 mb-2">
                      <p className="text-white/35 text-[0.55rem] font-bold uppercase tracking-wide mb-2">Today&apos;s Cravings</p>
                      <div className="flex flex-wrap gap-1.5">
                        {CRAVING_CHIPS.map((chip) => (
                          <span
                            key={chip.label}
                            className={`px-2.5 py-1 rounded-full text-[0.55rem] font-medium border ${
                              chip.active
                                ? "bg-pink-500/20 border-pink-500/40 text-pink-200"
                                : "bg-white/5 border-white/10 text-white/40"
                            }`}
                          >
                            {chip.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="px-3 flex-1 overflow-hidden">
                      <p className="text-white/35 text-[0.55rem] font-bold uppercase tracking-wide mb-2">Smart Picks for You</p>
                      <div className="space-y-1.5">
                        {RECO_ITEMS.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-xl p-2"
                          >
                            <span className="text-base">{item.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-white/80 text-[0.58rem] font-semibold truncate">{item.name}</p>
                              <p className="text-white/30 text-[0.48rem]">{item.why}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-emerald-300 text-[0.6rem] font-bold">{item.price}</p>
                              <span className={`${item.badgeClass} rounded-full px-1.5 py-0.5 text-[0.45rem] font-bold`}>
                                {item.badge}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom callout */}
          <motion.div
            variants={fadeUpVariants}
            className="glass-strong rounded-3xl p-8 sm:p-10 border border-pink-500/10 flex flex-col sm:flex-row items-center gap-8"
          >
            <div className="flex-1 space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">
                <span className="text-gradient-rose">Self-care shouldn&apos;t break the bank</span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Sakhi plans your comfort purchases ahead of time, so emotional spending never catches you off guard. Budget-friendly wellness, automated.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["🍫 Cravings Tracked", "💊 Supplements Planned", "🧘 Self-Care Budgeted", "📊 Mood-Spend Insights"].map((chip) => (
                  <span key={chip} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-200 border border-pink-500/15">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <p className="font-display text-5xl font-bold text-gradient-rose leading-none">73%</p>
              <p className="text-white/40 text-sm mt-1">reduced impulse spending</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
