"use client";

import { motion } from "framer-motion";
import { Heart, Lock, EyeOff, Shield, UserCheck, Trash2 } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { GradientText } from "@/components/shared/GradientText";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

const PRIVACY_FEATURES = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Your financial data is encrypted in transit and at rest. Not even our team can read your personal information.",
  },
  {
    icon: EyeOff,
    title: "Zero Data Selling",
    description: "We will never sell your data to advertisers, banks, or third parties. Your information stays yours, always.",
  },
  {
    icon: UserCheck,
    title: "You Own Your Data",
    description: "Download all your data at any time. Delete your account completely — including all associated data — with one tap.",
  },
  {
    icon: Shield,
    title: "No Third-Party Tracking",
    description: "We don't embed surveillance-grade trackers. Your behavior on SakhiFi is not sold to ad networks.",
  },
  {
    icon: Heart,
    title: "Judgment-Free Zone",
    description: "Ask any financial question without shame. Sakhi never judges past decisions — only helps you build a better future.",
  },
  {
    icon: Trash2,
    title: "Data Minimization",
    description: "We only collect what's necessary. If we don't need it to serve you, we don't collect it.",
  },
];

export function WomenFirst() {
  return (
    <section
      id="women-first"
      aria-label="Women-first privacy and safety"
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/10 to-transparent" />
      <GlowOrb color="rose" size="xl" className="-bottom-20 -right-20" intensity="low" />

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
            <SectionLabel variant="rose">Privacy & Safety</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Built for women, with{" "}
              <GradientText variant="rose-gold">women-first privacy</GradientText>
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg leading-relaxed font-light"
            >
              Financial privacy is personal safety. We built SakhiFi with the
              understanding that women face unique risks — from financial
              surveillance to data exploitation. Our architecture is designed to
              protect you.
            </motion.p>
          </div>

          {/* Privacy feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRIVACY_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUpVariants}
                  className="glass rounded-2xl p-6 border border-white/[0.07] hover:border-rose-500/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 group-hover:bg-rose-500/15 transition-colors">
                    <Icon className="w-4.5 h-4.5 text-rose-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Honest security note */}
          <motion.div
            variants={fadeUpVariants}
            className="glass rounded-2xl p-6 border border-white/[0.07] max-w-2xl mx-auto text-center"
          >
            <p className="text-white/40 text-sm leading-relaxed">
              <span className="text-white/60 font-medium">Honest transparency: </span>
              No system is completely unhackable. We use industry-standard security
              practices and continuously audit our systems. We will notify you promptly
              in the event of any breach affecting your data.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}