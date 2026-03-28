"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { FAQ_ITEMS } from "@/lib/constants";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
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
            <SectionLabel>FAQ</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Questions we hear often
            </motion.h2>
          </div>

          {/* FAQ items */}
          <div
            className="max-w-2xl mx-auto space-y-3"
            role="list"
          >
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                role="listitem"
              >
                <div className="glass rounded-2xl border border-white/[0.07] overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.03] transition-colors"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-medium text-white text-sm leading-snug">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                      {openIndex === index ? (
                        <Minus className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-white/40" aria-hidden="true" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 border-t border-white/[0.05]">
                          <p className="text-white/50 text-sm leading-relaxed pt-4">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}