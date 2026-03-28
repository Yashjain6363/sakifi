"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { GridBackground } from "@/components/shared/GridBackground";
import { GradientText } from "@/components/shared/GradientText";
import { SITE_CONFIG } from "@/lib/constants";
import {
  staggerContainerVariants,
  fadeUpVariants,
  dramaticTransition,
} from "@/lib/animations";

const SceneWrapper = dynamic(
  () =>
    import("@/components/three/SceneWrapper").then((mod) => ({
      default: mod.SceneWrapper,
    })),
  { ssr: false }
);

const FinancialOrb = dynamic(
  () =>
    import("@/components/three/FinancialOrb").then((mod) => ({
      default: mod.FinancialOrb,
    })),
  { ssr: false }
);

const ParticleField = dynamic(
  () =>
    import("@/components/three/ParticleField").then((mod) => ({
      default: mod.ParticleField,
    })),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="SakhiFi hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      <GridBackground />
      <GlowOrb color="rose" size="xl" className="-top-20 -right-32" intensity="medium" />
      <GlowOrb color="violet" size="xl" className="-bottom-20 -left-32" intensity="medium" />

      {/* Three.js background */}
      <div className="absolute inset-0 opacity-60" aria-hidden="true">
        <SceneWrapper>
          <FinancialOrb />
          <ParticleField />
        </SceneWrapper>
      </div>

      {/* Content */}
      <div className="relative container-max section-padding text-center z-10">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants} className="flex justify-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 border border-rose-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              <span className="text-xs font-medium text-rose-300 tracking-wide uppercase">
                Sign in · Magic link · Personalized coaching
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUpVariants}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-balance"
          >
            Your AI{" "}
            <GradientText variant="rose-violet">financial coach</GradientText>
            <br />
            <span className="text-white/90">for the student life</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {SITE_CONFIG.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="group">
              <a href="/signup">
                Sign up free
                <UserPlus
                  className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <a href="/login">
                Log in
                <LogIn className="w-4 h-4 ml-2" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <a href="#features">
                See How It Works
                <ArrowRight
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4"
          >
            {[
              "🔒 Privacy-First Architecture",
              "🛡️ Scam Detection Built-In",
              "🇮🇳 Made for India",
            ].map((item) => (
              <span
                key={item}
                className="text-xs text-white/30 font-medium"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian-DEFAULT to-transparent pointer-events-none" />
    </section>
  );
}
