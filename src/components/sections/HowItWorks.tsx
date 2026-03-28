"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-label="How SakhiFi works"
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      <GlowOrb color="violet" size="xl" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" intensity="low" />

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
            <SectionLabel variant="violet">Simple Start</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              From signup to financial clarity in four steps
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light"
            >
              No spreadsheets. No complexity. Just clear, actionable guidance from day one.
            </motion.p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute left-[2.25rem] top-12 bottom-12 w-px bg-gradient-to-b from-rose-500/30 via-violet-500/30 to-transparent hidden lg:block"
              aria-hidden="true"
            />

            <div className="space-y-6">
              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={fadeUpVariants}
                  className="relative flex flex-col lg:flex-row gap-6 lg:gap-12 items-start"
                >
                  {/* Step number */}
                  <div className="flex-shrink-0 flex items-center gap-4">
                    <div className="w-[4.5rem] h-[4.5rem] rounded-2xl glass border border-white/[0.1] flex flex-col items-center justify-center relative z-10">
                      <span
                        className="text-xl"
                        role="img"
                        aria-label={`${step.title} icon`}
                      >
                        {step.icon}
                      </span>
                      <span className="text-[10px] text-white/30 font-mono mt-0.5">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass rounded-2xl p-7 flex-1 border border-white/[0.07] hover:border-white/[0.12] transition-colors duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-display text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                        <p className="text-white/50 leading-relaxed text-sm max-w-xl">
                          {step.description}
                        </p>
                      </div>
                      <span
                        className="font-display text-6xl font-bold text-white/[0.04] select-none flex-shrink-0 hidden sm:block"
                        aria-hidden="true"
                      >
                        {step.step}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}