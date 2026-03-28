"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Ban, HelpCircle } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { GradientText } from "@/components/shared/GradientText";
import {
  staggerContainerVariants,
  fadeUpVariants,
  defaultViewport,
} from "@/lib/animations";

const PROBLEMS = [
  {
    icon: TrendingDown,
    title: "No Money Left by Month-End",
    description:
      "74% of Indian students run out of their allowance before the month ends, with no idea where it went.",
    stat: "74%",
    color: "text-rose-400",
  },
  {
    icon: AlertTriangle,
    title: "Targeted by Financial Scams",
    description:
      "Students lose ₹3,200 Cr+ annually to fraud — fake UPI links, job scams, scholarship traps.",
    stat: "₹3.2K Cr",
    color: "text-red-400",
  },
  {
    icon: Ban,
    title: "Zero Financial Education",
    description:
      "Schools don't teach budgeting, SIPs, credit scores, or taxes. Most students enter college financially illiterate.",
    stat: "0%",
    color: "text-violet-400",
  },
  {
    icon: HelpCircle,
    title: "No One to Ask",
    description:
      "Financial questions feel embarrassing. There's no judgment-free, student-friendly resource that speaks your language.",
    stat: "???",
    color: "text-gold-light",
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      aria-label="The problem we're solving"
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-DEFAULT via-red-950/5 to-obsidian-DEFAULT" />
      <GlowOrb color="rose" size="lg" className="-top-16 -right-16" intensity="low" />

      <div className="relative container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-16"
        >
          {/* Header */}
          <div className="space-y-5 text-center max-w-3xl mx-auto">
            <SectionLabel variant="rose">The Problem</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance"
            >
              Students are{" "}
              <GradientText variant="rose-violet">financially blind</GradientText>
              {" "}— and it's costing them
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light leading-relaxed"
            >
              Indian students face a financial literacy crisis. No tools, no
              education, no safety nets — just scams, overspending, and stress.
            </motion.p>
          </div>

          {/* Problem cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROBLEMS.map((problem) => {
              const Icon = problem.icon;
              return (
                <motion.div
                  key={problem.title}
                  variants={fadeUpVariants}
                  className="glass rounded-2xl p-7 border border-white/[0.07] hover:border-red-500/15 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/15 transition-colors">
                      <Icon
                        className="w-5 h-5 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className={`font-display text-3xl font-bold ${problem.color} opacity-30`}
                    >
                      {problem.stat}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
