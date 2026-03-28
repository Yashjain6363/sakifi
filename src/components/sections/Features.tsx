"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { FEATURES } from "@/lib/constants";
import {
  staggerContainerVariants,
  fadeUpVariants,
  cardHoverVariants,
  defaultViewport,
} from "@/lib/animations";

export function Features() {
  return (
    <section
      id="features"
      aria-label="Platform features"
      className="relative py-28 overflow-hidden"
    >
      <GlowOrb color="rose" size="lg" className="top-1/3 -right-20" intensity="low" />
      <GlowOrb color="violet" size="md" className="bottom-1/4 -left-16" intensity="low" />

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
            <SectionLabel variant="gold">Everything You Need</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Everything you need to win at money
            </motion.h2>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, index) => (
              <motion.article
                key={feature.id}
                variants={fadeUpVariants}
                initial="rest"
                whileHover="hover"
                className="group"
              >
              <motion.div
                  variants={cardHoverVariants}
                  className={`glass rounded-2xl p-7 h-full border border-white/[0.07] relative overflow-hidden cursor-default bg-gradient-to-br ${feature.gradient} hover:border-white/[0.14] transition-colors duration-300`}
                >
                  {/* Number */}
                  <div className="absolute top-5 right-5 font-display text-5xl font-bold text-white/[0.04] select-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div
                    className="text-3xl mb-5"
                    role="img"
                    aria-label={`${feature.title} icon`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* New badge */}
                  {feature.isNew && (
                    <span className="inline-block mt-4 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/20">
                      🆕 New Feature
                    </span>
                  )}
                </motion.div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}