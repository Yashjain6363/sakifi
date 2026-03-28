"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LogIn, Sparkles, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { GradientText } from "@/components/shared/GradientText";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

export function GetStarted() {
  return (
    <section
      id="get-started"
      aria-label="Sign up or log in to SakhiFi"
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/10 to-obsidian-DEFAULT" />
      <GlowOrb color="rose" size="xl" className="-top-24 -right-24" intensity="medium" />
      <GlowOrb color="violet" size="lg" className="-bottom-16 -left-16" intensity="low" />

      <div className="relative container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-xl mx-auto space-y-10 text-center"
        >
          <div className="space-y-5">
            <SectionLabel variant="rose">Get started</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Meet{" "}
              <GradientText variant="rose-violet">Sakhi</GradientText>{" "}
              with your email
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light leading-relaxed"
            >
              Sign up with email and a password, verify your inbox, then finish a
              short Sakhi chat — money and wellness tips tailored to you, including
              optional cycle-aware support.
            </motion.p>
          </div>

          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/signup">
                <UserPlus className="w-4 h-4 mr-2" aria-hidden />
                Create account
                <Sparkles className="w-4 h-4 ml-2 group-hover:animate-spin" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">
                <LogIn className="w-4 h-4 mr-2" aria-hidden />
                Log in
              </Link>
            </Button>
          </motion.div>

          <motion.p variants={fadeUpVariants} className="text-white/30 text-xs leading-relaxed max-w-md mx-auto">
            Prefer no password? On the log-in page you can use a one-time magic link
            instead. Turn on email confirmation in Supabase Auth for verified
            sign-ups.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
