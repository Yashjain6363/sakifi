"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { SCAM_TYPES } from "@/lib/constants";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

export function ScamShield() {
  return (
    <section
      id="scam-shield"
      aria-label="Scam detection and protection"
      className="relative py-28 overflow-hidden"
    >
      <GlowOrb color="violet" size="lg" className="-top-20 -left-20" intensity="low" />

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
            <SectionLabel variant="violet">Scam Shield™</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Stop scams before they cost you everything
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light leading-relaxed"
            >
              Indian students lose hundreds of crores annually to targeted financial
              scams. Sakhi's AI is trained to detect them in real time.
            </motion.p>
          </div>

          {/* Mock chat UI showing scam detection */}
          <motion.div
            variants={fadeUpVariants}
            className="max-w-lg mx-auto"
          >
            <div className="glass rounded-3xl p-6 border border-white/[0.1] space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs text-white/40 font-mono">Scam Detection Active</span>
              </div>

              {/* Suspicious message */}
              <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/5">
                <p className="text-sm text-white/70">
                  "Congratulations! You've won a ₹50,000 scholarship. Send ₹500
                  registration fee to UPI ID xyz@ybl to claim. Offer expires in 1 hour."
                </p>
              </div>

              {/* Sakhi alert */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl rounded-bl-none p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm font-semibold text-red-300">
                    Sakhi Alert: High-Risk Scam Detected
                  </span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  This matches 4 known scholarship scam patterns. Legitimate
                  scholarships never require payment. Do NOT send money.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle className="w-3 h-3" aria-hidden="true" />
                  Flagged and blocked for your safety
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scam types grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCAM_TYPES.map((scam) => (
              <motion.div
                key={scam.title}
                variants={fadeUpVariants}
                className="glass rounded-xl p-5 border border-white/[0.07] flex gap-4 hover:border-violet-500/20 transition-colors duration-300"
              >
                <div className="text-2xl flex-shrink-0" role="img" aria-label={scam.title}>
                  {scam.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">{scam.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{scam.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stat */}
          <motion.div
            variants={fadeUpVariants}
            className="text-center"
          >
            <p className="text-white/40 text-sm">
              <span className="text-white/70 font-semibold text-lg">₹3,200 Cr+</span>
              {" "}lost by Indian students to financial fraud annually.{" "}
              <span className="text-rose-400">Sakhi is trained to stop all known patterns.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}