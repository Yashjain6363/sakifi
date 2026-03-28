"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { GradientText } from "@/components/shared/GradientText";
import {
  staggerContainerVariants,
  fadeUpVariants,
  defaultViewport,
} from "@/lib/animations";

export function CTABanner() {
  return (
    <section
      id="cta"
      aria-label="Call to action"
      className="relative py-32 overflow-hidden bg-obsidian-950"
    >
      {/* Rich background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-DEFAULT via-violet-950/20 to-obsidian-DEFAULT" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[160px]" />
      </div>
      <GlowOrb color="violet" size="xl" className="top-1/4 -left-32" intensity="low" />
      <GlowOrb color="rose" size="xl" className="bottom-1/4 -right-32" intensity="low" />

      <div className="relative container-max section-padding text-center">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-8 max-w-3xl mx-auto"
        >
          <motion.h2
            variants={fadeUpVariants}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance"
          >
            Start your financial{" "}
            <GradientText variant="rose-violet">glow-up</GradientText>
            {" "}today
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-white/45 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            Join 50,000+ students building smarter money habits with AI.
            Your financial independence journey starts with one step.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Button asChild size="lg" className="group text-base px-8">
              <a href="/signup">
                Sign up free
                <Sparkles className="w-4 h-4 ml-2 group-hover:animate-spin" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="group text-base px-8">
              <a href="/login">
                Log in
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="group text-base px-8">
              <a href="#features">
                See How It Works
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            className="text-white/20 text-sm"
          >
            No credit card required · Free for students · Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
