"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

const GOALS = [
  { label: "Emergency Fund", target: 30000, current: 18500, color: "rose", emoji: "🛡️" },
  { label: "New Laptop", target: 55000, current: 41250, color: "violet", emoji: "💻" },
  { label: "Study Abroad Fees", target: 120000, current: 36000, color: "gold", emoji: "✈️" },
];

export function GoalsSavings() {
  return (
    <section
      id="goals"
      aria-label="Goal planning and savings"
      className="relative py-28 overflow-hidden"
    >
      <GlowOrb color="gold" size="lg" className="-bottom-16 left-1/4" intensity="low" />
      <GlowOrb color="violet" size="md" className="top-1/3 -left-16" intensity="low" />

      <div className="container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-16"
        >
          {/* Header */}
          <div className="space-y-5 text-center max-w-2xl mx-auto">
            <SectionLabel variant="gold">Goal Planning</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Turn big dreams into achievable savings plans
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light leading-relaxed"
            >
              From your emergency fund to that semester abroad — Sakhi breaks
              every goal into a realistic, personalized savings roadmap with
              milestone celebrations along the way.
            </motion.p>
          </div>

          {/* Goals tracker */}
          <motion.div
            variants={staggerContainerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto"
          >
            {GOALS.map((goal) => {
              const percentage = Math.round((goal.current / goal.target) * 100);
              const colorMap: Record<string, { ring: string; bar: string; text: string }> = {
                rose: { ring: "ring-rose-500/20", bar: "bg-rose-500", text: "text-rose-400" },
                violet: { ring: "ring-violet-500/20", bar: "bg-violet-500", text: "text-violet-400" },
                gold: { ring: "ring-gold-DEFAULT/20", bar: "bg-gold-DEFAULT", text: "text-gold-light" },
              };
              const c = colorMap[goal.color];

              return (
                <motion.div
                  key={goal.label}
                  variants={fadeUpVariants}
                  className={`glass rounded-2xl p-6 border border-white/[0.08] ring-1 ${c.ring} space-y-4`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label={goal.label}>{goal.emoji}</span>
                    <div>
                      <p className="text-white font-medium text-sm">{goal.label}</p>
                      <p className="text-white/40 text-xs">
                        ₹{(goal.current / 1000).toFixed(1)}K / ₹{(goal.target / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>

                  {/* Circular progress */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          fill="none"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="6"
                        />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="34"
                          fill="none"
                          stroke={goal.color === "rose" ? "#E8758A" : goal.color === "violet" ? "#8B5CF6" : "#C9A96E"}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 34}`}
                          strokeDashoffset={2 * Math.PI * 34}
                          initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                          whileInView={{
                            strokeDashoffset: 2 * Math.PI * 34 * (1 - percentage / 100),
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-lg font-display font-semibold ${c.text}`}>
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-white/40 text-center">
                    ₹{((goal.target - goal.current) / 1000).toFixed(1)}K to go
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Goal types */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "Emergency Fund",
              "Semester Fees",
              "New Laptop",
              "Study Abroad",
              "Travel Plans",
              "First Investment",
              "Side Hustle Start",
              "Family Support",
            ].map((goal) => (
              <div
                key={goal}
                className="glass rounded-full px-4 py-2 text-sm text-white/60 border border-white/[0.07] hover:border-rose-500/20 hover:text-white/80 transition-all duration-200"
              >
                {goal}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}