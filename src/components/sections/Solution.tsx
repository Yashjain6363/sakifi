"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { GradientText } from "@/components/shared/GradientText";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

export function Solution() {
  return (
    <section
      id="solution"
      aria-label="Our solution"
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-DEFAULT via-obsidian-800/30 to-obsidian-DEFAULT" />
      <GlowOrb color="violet" size="xl" className="-bottom-32 -left-32" intensity="low" />

      <div className="relative container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-20"
        >
          {/* Header */}
          <div className="space-y-5 text-center max-w-3xl mx-auto">
            <SectionLabel variant="violet">The Solution</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance"
            >
              Meet <GradientText variant="rose-violet">Sakhi</GradientText> —{" "}
              your AI financial companion
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg leading-relaxed font-light"
            >
              Sakhi isn't a generic budgeting app. She's an intelligent financial
              coach who understands your life as an Indian student — your
              allowance, your goals, your risks, your language.
            </motion.p>
          </div>

          {/* Big feature statement cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "🧠",
                title: "Intelligent, Not Formulaic",
                description:
                  "Sakhi learns your unique financial patterns and adapts her advice to your actual life — not a spreadsheet template.",
                gradient: "from-rose-500/10 to-transparent",
              },
              {
                emoji: "💬",
                title: "Conversational, Not Clinical",
                description:
                  "Ask anything in plain language. 'Can I afford a new phone?' 'Is this link safe?' 'What's a SIP?' Sakhi answers clearly.",
                gradient: "from-violet-500/10 to-transparent",
                featured: true,
              },
              {
                emoji: "🛡️",
                title: "Protective, Not Passive",
                description:
                  "Sakhi actively watches for scam patterns, risky financial decisions, and sends proactive alerts before you lose money.",
                gradient: "from-gold-DEFAULT/10 to-transparent",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUpVariants}
                className={`glass rounded-3xl p-8 border border-white/[0.08] relative overflow-hidden group hover:border-white/[0.15] transition-all duration-300 ${card.featured ? "ring-1 ring-rose-500/20" : ""}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} pointer-events-none`}
                  aria-hidden="true"
                />
                <div className="relative space-y-4">
                  <div className="text-4xl">{card.emoji}</div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm">
                    {card.description}
                  </p>
                  {card.featured && (
                    <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium">
                      <Sparkles className="w-3 h-3" aria-hidden="true" />
                      Core AI Experience
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}