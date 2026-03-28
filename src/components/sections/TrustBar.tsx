"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { TRUST_STATS } from "@/lib/constants";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

export function TrustBar() {
  return (
    <section
      aria-label="Trust statistics"
      className="relative py-16 border-y border-white/[0.04] bg-white/[0.01]"
    >
      <div className="container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {TRUST_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUpVariants}
              className="text-center space-y-1"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-gradient-rose">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimal={"decimal" in stat && !!stat.decimal}
                />
              </div>
              <p className="text-white/40 text-xs sm:text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
