"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { UNIQUE_FEATURES } from "@/lib/constants";
import {
  staggerContainerVariants,
  fadeUpVariants,
  cardHoverVariants,
  defaultViewport,
} from "@/lib/animations";

export function UniqueFeatures() {
  return (
    <section
      id="unique-features"
      aria-label="Signature features"
      className="relative py-28 overflow-hidden"
    >
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/10 via-transparent to-transparent" />
      <GlowOrb color="violet" size="xl" className="-top-20 -left-24" intensity="low" />
      <GlowOrb color="rose" size="lg" className="bottom-20 -right-16" intensity="low" />

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
            <SectionLabel variant="violet">Only on SakhiFi</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Signature features you won&apos;t find anywhere else
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light leading-relaxed"
            >
              These aren&apos;t just features. They&apos;re what makes SakhiFi unlike anything else out there.
            </motion.p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {UNIQUE_FEATURES.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUpVariants}
                initial="rest"
                whileHover="hover"
                className="group"
              >
                <motion.div
                  variants={cardHoverVariants}
                  className="glass rounded-2xl p-7 h-full border border-white/[0.07] hover:border-violet-500/20 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Gradient icon badge */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-rose-500/10 border border-violet-500/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-violet-500/10">
                    {feature.icon}
                  </div>

                  <h3 className="font-display text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Tag */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/15">
                    {feature.tag}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
