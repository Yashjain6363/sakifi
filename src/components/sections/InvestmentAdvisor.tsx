"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import {
  SIP_TABLE_DATA,
  STOCK_RECOMMENDATIONS,
  INVESTMENT_TIMELINE,
} from "@/lib/constants";
import {
  staggerContainerVariants,
  fadeUpVariants,
  defaultViewport,
} from "@/lib/animations";

const TABS = ["SIP Calculator", "Top Picks", "Growth Timeline"];

export function InvestmentAdvisor() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="investment-advisor"
      aria-label="AI investment advisor"
      className="relative py-28 overflow-hidden bg-obsidian-950"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-DEFAULT via-obsidian-950 to-obsidian-DEFAULT" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[15%] w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-[15%] w-80 h-80 bg-teal-500/5 rounded-full blur-[100px]" />
      </div>
      <GlowOrb color="amber" size="lg" className="top-20 -right-16" intensity="low" />

      <div className="relative container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-5 max-w-2xl">
            <SectionLabel variant="gold">📈 Investment Advisor</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Start investing with{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                just ₹500/month
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light leading-relaxed"
            >
              Warren Buffett-level investment wisdom, simplified for every student&apos;s budget.
              Sakhi guides you from your first SIP to building real wealth.
            </motion.p>
          </div>

          {/* Tabs */}
          <motion.div variants={fadeUpVariants} className="flex gap-2 flex-wrap">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeTab === i
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-200"
                    : "bg-white/[0.04] border-white/[0.08] text-white/45 hover:bg-white/[0.07] hover:text-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Tab content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeTab === 0 && (
              <>
                {/* SIP Table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-2xl p-6 border border-white/[0.07]"
                >
                  <p className="text-white/35 text-[0.65rem] font-bold uppercase tracking-wider mb-1">
                    SIP Power Calculator
                  </p>
                  <p className="text-lg font-semibold text-white mb-4">
                    Small amounts, massive results
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          <th className="text-white/25 text-[0.6rem] font-bold uppercase tracking-wider pb-2 pr-3">Monthly</th>
                          <th className="text-white/25 text-[0.6rem] font-bold uppercase tracking-wider pb-2 pr-3">Duration</th>
                          <th className="text-white/25 text-[0.6rem] font-bold uppercase tracking-wider pb-2 pr-3">Invested</th>
                          <th className="text-white/25 text-[0.6rem] font-bold uppercase tracking-wider pb-2">Returns</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SIP_TABLE_DATA.map((row) => (
                          <tr
                            key={row.monthly}
                            className={`border-t border-white/[0.05] ${row.highlight ? "bg-white/[0.03]" : ""} hover:bg-white/[0.03] transition-colors`}
                          >
                            <td className="py-2.5 pr-3 text-white/70 text-xs">{row.monthly}</td>
                            <td className="py-2.5 pr-3 text-white/50 text-xs">{row.years}</td>
                            <td className="py-2.5 pr-3 text-white/40 text-xs">{row.invested}</td>
                            <td className={`py-2.5 text-xs font-bold ${row.highlight ? "text-emerald-300" : "text-white/70"}`}>
                              {row.returns}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-white/25 text-[0.6rem] mt-3">* Assuming 12% avg annual returns (Nifty 50 historical)</p>
                </motion.div>

                {/* Quote card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="glass rounded-2xl p-6 border border-amber-500/10 relative overflow-hidden"
                >
                  <div className="absolute -top-4 left-5 font-display text-7xl font-bold text-amber-500/10 leading-none select-none">&ldquo;</div>
                  <div className="relative">
                    <p className="text-white/75 font-display text-lg leading-relaxed italic mb-4 pt-6">
                      The best time to plant a tree was 20 years ago. The second best time is now.
                      Start with ₹500 — compound interest will do the heavy lifting.
                    </p>
                    <p className="text-amber-400/60 text-sm font-semibold">— Adapted from Warren Buffett&apos;s wisdom</p>

                    <div className="mt-4 bg-teal-500/10 border border-teal-500/15 rounded-xl p-4">
                      <p className="text-teal-300 text-[0.6rem] font-bold uppercase tracking-wider mb-1">Sakhi&apos;s Take</p>
                      <p className="text-white/60 text-xs leading-relaxed">
                        Starting a ₹500/month SIP at age 18 gives you a 7-year head start over someone who starts at 25.
                        That head start alone can mean ₹15L+ more at retirement. Time is your biggest asset.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {activeTab === 1 && (
              <>
                {/* Stock picks */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-2xl p-6 border border-white/[0.07]"
                >
                  <p className="text-white/35 text-[0.65rem] font-bold uppercase tracking-wider mb-1">
                    Beginner-Friendly Picks
                  </p>
                  <p className="text-lg font-semibold text-white mb-4">
                    Safe, diversified, student-budget ready
                  </p>
                  <div className="space-y-3">
                    {STOCK_RECOMMENDATIONS.map((stock) => (
                      <div
                        key={stock.name}
                        className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 hover:bg-white/[0.06] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg ${stock.logoBg} flex items-center justify-center text-white text-xs font-extrabold`}>
                            {stock.logo}
                          </div>
                          <div>
                            <p className="text-white/80 text-xs font-bold">{stock.name}</p>
                            <p className="text-white/30 text-[0.6rem]">{stock.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-emerald-300 text-xs font-bold">{stock.change}</p>
                          <p className="text-white/25 text-[0.55rem]">{stock.tag}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Why index tip */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="glass rounded-2xl p-6 border border-white/[0.07] flex flex-col justify-center"
                >
                  <p className="text-amber-300/80 text-2xl mb-3">💡</p>
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    Why Sakhi recommends Index Funds first
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    89% of actively managed funds underperform index funds over 10+ years.
                    Starting with Nifty 50/Sensex index funds gives you market returns
                    with zero expertise needed — perfect for beginners.
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <p className="font-display text-2xl font-bold text-amber-300">89%</p>
                      <p className="text-white/30 text-xs">funds underperform</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-bold text-amber-300">0.1%</p>
                      <p className="text-white/30 text-xs">expense ratio</p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {activeTab === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-6 border border-white/[0.07] lg:col-span-2"
              >
                <p className="text-white/35 text-[0.65rem] font-bold uppercase tracking-wider mb-1">
                  The Power of Starting Early
                </p>
                <p className="text-lg font-semibold text-white mb-6">
                  Your wealth timeline with SakhiFi
                </p>
                <div className="space-y-4">
                  {INVESTMENT_TIMELINE.map((row) => (
                    <div key={row.age} className="flex items-center gap-4">
                      <span className="text-white/35 text-xs w-20 flex-shrink-0 font-semibold">{row.age}</span>
                      <div className="flex-1 h-8 bg-white/[0.04] rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: row.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                          className={`h-full rounded-lg bg-gradient-to-r ${row.color} flex items-center pl-3`}
                        >
                          <span className="text-white/90 text-[0.6rem] font-bold whitespace-nowrap">{row.text}</span>
                        </motion.div>
                      </div>
                      <span className="text-amber-200 text-sm font-bold w-16 text-right flex-shrink-0">{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/25 text-[0.6rem] mt-4">* Assumes 12% CAGR. Actual returns may vary.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
