"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

const LITERACY_TOPICS = [
  {
    category: "Banking Basics",
    color: "rose",
    topics: ["How interest really works", "Savings vs Current accounts", "Understanding your salary slip", "When to use a credit card"],
  },
  {
    category: "Investing 101",
    color: "violet",
    topics: ["What is a SIP?", "Index funds explained", "Risk vs return", "Starting with ₹500/month"],
  },
  {
    category: "Tax & Insurance",
    color: "gold",
    topics: ["Income tax basics", "Health insurance for students", "Why term insurance matters", "80C deductions"],
  },
  {
    category: "Digital Safety",
    color: "rose",
    topics: ["UPI safety rules", "Reading a credit report", "Loan traps to avoid", "Safe online shopping"],
  },
];

const COLOR_MAP: Record<string, { text: string; dot: string; border: string }> = {
  rose: { text: "text-rose-400", dot: "bg-rose-400", border: "border-rose-500/20" },
  violet: { text: "text-violet-400", dot: "bg-violet-400", border: "border-violet-500/20" },
  gold: { text: "text-gold-light", dot: "bg-gold-DEFAULT", border: "border-gold-DEFAULT/20" },
};

export function FinancialLiteracy() {
  return (
    <section
      id="literacy"
      aria-label="Financial literacy curriculum"
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent" />

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
            <SectionLabel variant="violet">Financial Literacy</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Learn money in the context of your actual life
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light leading-relaxed"
            >
              Not textbook theory. Real lessons about real topics that affect
              you right now — delivered in plain language, when you need them.
            </motion.p>
          </div>

          {/* Topics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LITERACY_TOPICS.map((section) => {
              const c = COLOR_MAP[section.color];
              return (
                <motion.div
                  key={section.category}
                  variants={fadeUpVariants}
                  className={`glass rounded-2xl p-6 border ${c.border} space-y-4`}
                >
                  <h3 className={`font-display font-semibold text-lg ${c.text}`}>
                    {section.category}
                  </h3>
                  <ul className="space-y-2.5" role="list">
                    {section.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-3">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`}
                          aria-hidden="true"
                        />
                        <span className="text-white/65 text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom note */}
          <motion.div
            variants={fadeUpVariants}
            className="text-center"
          >
            <p className="text-white/40 text-sm">
              Lessons are bite-sized, accessible, and designed to take under 5 minutes.
              No financial background required.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}