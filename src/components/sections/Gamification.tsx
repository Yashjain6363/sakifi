"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { GAMIFICATION_LEVELS } from "@/lib/constants";
import {
  staggerContainerVariants,
  fadeUpVariants,
  cardHoverVariants,
  defaultViewport,
} from "@/lib/animations";

const XP_STATS = [
  { num: "🔥 12", label: "Day Streak" },
  { num: "3,847", label: "Total XP" },
  { num: "14", label: "Badges Earned" },
  { num: "Level 3", label: "Current Rank" },
];

export function Gamification() {
  return (
    <section
      id="gamification"
      aria-label="Gamification system"
      className="relative py-28 overflow-hidden bg-obsidian-950"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-DEFAULT via-violet-950/15 to-obsidian-DEFAULT" />
      <GlowOrb color="violet" size="xl" className="top-1/3 -left-24" intensity="low" />
      <GlowOrb color="rose" size="lg" className="bottom-1/4 -right-16" intensity="low" />

      <div className="relative container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-16"
        >
          {/* Header */}
          <div className="space-y-5 text-center max-w-2xl mx-auto">
            <SectionLabel variant="violet">🎮 Gamified Growth</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Level up your finances,{" "}
              <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                one XP at a time
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light"
            >
              Managing money should be fun. Earn XP, unlock badges, climb levels, and build habits that last.
            </motion.p>
          </div>

          {/* Level cards */}
          <div className="flex flex-wrap justify-center gap-4">
            {GAMIFICATION_LEVELS.map((level) => (
              <motion.div
                key={level.name}
                variants={fadeUpVariants}
                initial="rest"
                whileHover="hover"
                className="group"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className={`glass rounded-3xl p-6 min-w-[200px] border transition-all duration-300 ${
                    level.active
                      ? "border-teal-500/30 bg-teal-500/[0.08] shadow-lg shadow-teal-500/10"
                      : "border-white/[0.08] hover:border-white/[0.14]"
                  }`}
                >
                  <span className="text-4xl block mb-3">{level.badge}</span>
                  <h3 className="font-semibold text-white text-base mb-1">{level.name}</h3>
                  <p className="text-white/30 text-xs mb-3">{level.xpRange}</p>
                  <ul className="space-y-1">
                    {level.perks.map((perk) => (
                      <li key={perk} className="text-white/45 text-xs flex items-start gap-1.5">
                        <span className="text-teal-400 text-[0.6rem] mt-0.5">✦</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  {level.active && (
                    <div className="mt-3 px-2.5 py-1 rounded-full bg-teal-500/15 border border-teal-500/20 text-teal-300 text-[0.6rem] font-bold inline-block">
                      CURRENT LEVEL
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* XP stats strip */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4"
          >
            {XP_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent leading-none">
                  {stat.num}
                </p>
                <p className="text-white/35 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
