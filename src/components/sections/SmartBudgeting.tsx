"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import {
  staggerContainerVariants,
  fadeUpVariants,
  defaultViewport,
} from "@/lib/animations";

const BUDGET_CATEGORIES = [
  { label: "Food & Dining", amount: 4500, total: 6000, emoji: "🍕", color: "bg-rose-500" },
  { label: "Transport", amount: 1200, total: 2000, emoji: "🚌", color: "bg-violet-500" },
  { label: "Books & Supplies", amount: 800, total: 1500, emoji: "📚", color: "bg-gold-DEFAULT" },
  { label: "Entertainment", amount: 2200, total: 2500, emoji: "🎬", color: "bg-rose-400" },
  { label: "Subscriptions", amount: 500, total: 500, emoji: "📱", color: "bg-violet-400" },
];

const AI_INSIGHTS = [
  {
    message: "You've spent 75% of your food budget with 10 days left. Consider cooking at home this weekend! 🍳",
    type: "warning" as const,
  },
  {
    message: "Great news! You're ₹800 under budget on transport this month. Transfer to your savings goal? 🎯",
    type: "success" as const,
  },
  {
    message: "Your entertainment spending is trending 15% lower than last month. Keep it up! 📈",
    type: "info" as const,
  },
];

export function SmartBudgeting() {
  return (
    <section
      id="budgeting"
      aria-label="Smart AI budgeting"
      className="relative py-28 overflow-hidden"
    >
      <GlowOrb color="rose" size="lg" className="-top-16 -right-16" intensity="low" />
      <GlowOrb color="violet" size="md" className="bottom-1/4 -left-12" intensity="low" />

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
            <SectionLabel variant="rose">AI Budgeting</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              A budget that actually understands your life
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light leading-relaxed"
            >
              Sakhi doesn't give you a generic 50-30-20 rule. She builds a plan
              around your actual spending, goals, and habits — then guides you
              through it with real-time nudges.
            </motion.p>
          </div>

          {/* Mock UI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Budget tracker card */}
            <motion.div
              variants={fadeUpVariants}
              className="glass rounded-3xl p-6 border border-white/[0.1] space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-white">March Budget</h3>
                <span className="text-xs text-white/40 font-mono">₹12,500 total</span>
              </div>

              <div className="space-y-4">
                {BUDGET_CATEGORIES.map((cat) => {
                  const percentage = Math.round((cat.amount / cat.total) * 100);
                  return (
                    <div key={cat.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70 flex items-center gap-2">
                          <span role="img" aria-label={cat.label}>{cat.emoji}</span>
                          {cat.label}
                        </span>
                        <span className="text-white/40 text-xs font-mono">
                          ₹{cat.amount.toLocaleString()} / ₹{cat.total.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${cat.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* AI insights card */}
            <motion.div
              variants={fadeUpVariants}
              className="glass rounded-3xl p-6 border border-white/[0.1] space-y-5"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">✨</span>
                <h3 className="font-display font-semibold text-white">Sakhi's Insights</h3>
              </div>

              <div className="space-y-3">
                {AI_INSIGHTS.map((insight, index) => {
                  const borderColor =
                    insight.type === "warning"
                      ? "border-gold-DEFAULT/20"
                      : insight.type === "success"
                        ? "border-emerald-500/20"
                        : "border-violet-500/20";
                  const bgColor =
                    insight.type === "warning"
                      ? "bg-gold-DEFAULT/5"
                      : insight.type === "success"
                        ? "bg-emerald-500/5"
                        : "bg-violet-500/5";

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.2 }}
                      className={`rounded-xl p-4 border ${borderColor} ${bgColor}`}
                    >
                      <p className="text-sm text-white/65 leading-relaxed">
                        {insight.message}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center">
                <p className="text-xs text-white/30">
                  Insights update in real-time based on your spending
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
