"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { DASHBOARD_GOALS } from "@/lib/constants";
import {
  staggerContainerVariants,
  fadeUpVariants,
  scaleUpVariants,
  defaultViewport,
} from "@/lib/animations";

const SPENDING = [
  { label: "🍛 Food", pct: 42, gradient: "from-violet-500 to-violet-300" },
  { label: "🚌 Transport", pct: 18, gradient: "from-teal-500 to-teal-300" },
  { label: "📚 Study", pct: 24, gradient: "from-pink-500 to-pink-300" },
  { label: "🎉 Social", pct: 16, gradient: "from-amber-500 to-amber-300" },
];

export function DashboardPreview() {
  return (
    <section
      id="dashboard"
      aria-label="Dashboard preview"
      className="relative py-28 overflow-hidden bg-obsidian-950"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-DEFAULT via-obsidian-950 to-obsidian-DEFAULT" />
      <GlowOrb color="violet" size="xl" className="top-1/4 -left-20" intensity="low" />
      <GlowOrb color="rose" size="lg" className="bottom-1/3 -right-16" intensity="low" />

      <div className="relative container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-5 text-center max-w-2xl mx-auto">
            <SectionLabel variant="violet">Dashboard</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Your financial life, at a glance
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light"
            >
              A beautiful dashboard that turns complex money data into clear, actionable insights.
            </motion.p>
          </div>

          {/* Dashboard mockup */}
          <motion.div
            variants={scaleUpVariants}
            className="max-w-4xl mx-auto glass-strong rounded-3xl p-6 sm:p-8 border border-white/[0.08]"
          >
            {/* Topbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-white/30 text-xs font-medium">
                SakhiFi Dashboard — Priya Sharma
              </span>
              <div className="w-16" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Monthly Budget */}
              <div className="glass rounded-2xl p-5 border border-white/[0.06]">
                <p className="text-white/40 text-[0.65rem] font-semibold uppercase tracking-wider mb-1">Monthly Budget</p>
                <p className="font-display text-2xl font-bold text-white">₹8,200</p>
                <p className="text-white/30 text-xs mt-1">↑ ₹400 more than last month</p>
              </div>

              {/* Saved */}
              <div className="glass rounded-2xl p-5 border border-white/[0.06]">
                <p className="text-white/40 text-[0.65rem] font-semibold uppercase tracking-wider mb-1">Saved This Month</p>
                <p className="font-display text-2xl font-bold text-white">₹1,640</p>
                <p className="text-xs mt-1">
                  <span className="text-emerald-400 font-bold">↑ 22%</span>
                  <span className="text-white/30"> vs October</span>
                </p>
              </div>

              {/* Scams Blocked */}
              <div className="glass rounded-2xl p-5 border border-white/[0.06]">
                <p className="text-white/40 text-[0.65rem] font-semibold uppercase tracking-wider mb-1">Scams Blocked</p>
                <p className="font-display text-2xl font-bold text-white">3</p>
                <p className="text-white/30 text-xs mt-1">₹12,000 protected</p>
              </div>

              {/* Spending Breakdown — spans 2 cols */}
              <div className="glass rounded-2xl p-5 border border-white/[0.06] col-span-2">
                <p className="text-white/40 text-[0.65rem] font-semibold uppercase tracking-wider mb-3">Spending Breakdown</p>
                <div className="space-y-3">
                  {SPENDING.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-white/50 text-xs w-20 flex-shrink-0">{item.label}</span>
                      <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${item.gradient}`}
                        />
                      </div>
                      <span className="text-white/30 text-xs w-8 text-right">{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Goals */}
              <div className="glass rounded-2xl p-5 border border-white/[0.06]">
                <p className="text-white/40 text-[0.65rem] font-semibold uppercase tracking-wider mb-3">Active Goals</p>
                <div className="space-y-3">
                  {DASHBOARD_GOALS.map((goal) => (
                    <div key={goal.name} className="flex items-center gap-2">
                      <span className="text-sm">{goal.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/70 text-xs font-semibold truncate">{goal.name}</p>
                        <div className="h-1.5 bg-white/[0.06] rounded-full mt-1 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${goal.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-teal-400"
                          />
                        </div>
                      </div>
                      <span className="text-white/30 text-xs">{goal.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
