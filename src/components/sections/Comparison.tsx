"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { COMPARISON_ITEMS } from "@/lib/constants";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

export function Comparison() {
  return (
    <section
      id="comparison"
      aria-label="SakhiFi vs other apps comparison"
      className="relative py-28 overflow-hidden"
    >
      <div className="container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-5 text-center max-w-2xl mx-auto">
            <SectionLabel>Why SakhiFi</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Nothing else is built like this
            </motion.h2>
          </div>

          {/* Comparison table */}
          <motion.div variants={fadeUpVariants}>
            <div
              className="glass rounded-3xl border border-white/[0.08] overflow-hidden"
              role="table"
              aria-label="Feature comparison table"
            >
              {/* Header */}
              <div
                className="grid grid-cols-3 p-4 border-b border-white/[0.07] bg-white/[0.02]"
                role="row"
              >
                <div role="columnheader" className="text-white/40 text-sm font-medium">Feature</div>
                <div
                  role="columnheader"
                  className="text-center"
                >
                  <span className="text-gradient-rose font-display font-semibold text-lg">SakhiFi</span>
                </div>
                <div
                  role="columnheader"
                  className="text-center text-white/40 text-sm font-medium"
                >
                  Other Apps
                </div>
              </div>

              {/* Rows */}
              {COMPARISON_ITEMS.map((item, index) => (
                <div
                  key={item.feature}
                  role="row"
                  className={`grid grid-cols-3 p-4 items-center transition-colors hover:bg-white/[0.02] ${index < COMPARISON_ITEMS.length - 1 ? "border-b border-white/[0.05]" : ""}`}
                >
                  <div
                    role="cell"
                    className="text-white/65 text-sm pr-4"
                  >
                    {item.feature}
                  </div>
                  <div role="cell" className="flex justify-center">
                    {typeof item.sakhifi === "boolean" ? (
                      item.sakhifi ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-emerald-400" aria-label="Yes" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                          <X className="w-3.5 h-3.5 text-red-400" aria-label="No" />
                        </div>
                      )
                    ) : (
                      <span className="text-sm text-emerald-400 font-medium">{item.sakhifi}</span>
                    )}
                  </div>
                  <div role="cell" className="flex justify-center">
                    {typeof item.others === "boolean" ? (
                      item.others ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-emerald-400" aria-label="Yes" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                          <X className="w-3.5 h-3.5 text-red-400" aria-label="No" />
                        </div>
                      )
                    ) : (
                      <span className="text-sm text-white/40 font-medium">{item.others}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}