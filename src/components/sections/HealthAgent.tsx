"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { CHECKUP_ITEMS } from "@/lib/constants";
import {
  staggerContainerVariants,
  fadeUpVariants,
  slideInLeftVariants,
  slideInRightVariants,
  defaultViewport,
} from "@/lib/animations";

const HEALTH_CARDS = [
  {
    icon: "🏥",
    title: "Medical Expense Forecaster",
    subtitle: "Plan ahead, not panic",
    body: "Sakhi estimates your annual health costs and builds a medical micro-fund — so a ₹2,000 dental bill never becomes an emergency.",
  },
  {
    icon: "🍎",
    title: "Nutrition on a Budget",
    subtitle: "Healthy ≠ Expensive",
    body: "Get meal suggestions that balance nutrition and affordability. Sakhi finds the cheapest sources of protein, iron, and vitamins near your campus.",
  },
];

const CHAT_MESSAGES = [
  { role: "user" as const, text: "I've been getting frequent headaches and feeling tired a lot lately" },
  {
    role: "ai" as const,
    label: "Sakhi Health AI",
    text: "That sounds concerning. Based on your profile, I'd suggest a Vitamin D + B12 panel (₹600-800). You haven't had one in 14 months. Common in students with limited sun exposure. Want me to add it to your health budget?",
  },
  { role: "user" as const, text: "Yes, and find an affordable clinic nearby" },
  {
    role: "ai" as const,
    label: "Sakhi Health AI",
    text: "Found 3 labs near your campus. Best value: HealthKart Lab — ₹599 for full panel, 0.8km away. I've set aside ₹600 from your flex budget this week. 📋",
  },
];

const DOT_COLORS: Record<string, string> = {
  green: "bg-emerald-500/15",
  blue: "bg-blue-500/12",
  orange: "bg-amber-500/12",
  rose: "bg-rose-500/10",
  purple: "bg-violet-500/12",
};

export function HealthAgent() {
  return (
    <section
      id="health-agent"
      aria-label="Health concern agent"
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/8 to-transparent" />
      <GlowOrb color="emerald" size="lg" className="-bottom-20 -left-16" intensity="low" />

      <div className="relative container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-16"
        >
          {/* Layout */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left — checkup timeline */}
            <motion.div variants={slideInLeftVariants} className="flex-1 space-y-6 min-w-0">
              <SectionLabel variant="gold" className="justify-start">
                🩺 Health Agent
              </SectionLabel>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance">
                Prevention is the best{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  investment
                </span>
              </h2>
              <p className="text-white/50 text-lg font-light leading-relaxed max-w-lg">
                Sakhi tracks preventive checkups, forecasts medical expenses, and builds a health budget
                that keeps you healthy and financially secure.
              </p>

              {/* Timeline */}
              <div className="space-y-0 pt-2">
                {CHECKUP_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={fadeUpVariants}
                    className="flex gap-4 relative pb-5 last:pb-0"
                  >
                    {/* Connecting line */}
                    {index < CHECKUP_ITEMS.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/20 to-transparent" />
                    )}

                    {/* Dot */}
                    <div className={`w-10 h-10 rounded-xl ${DOT_COLORS[item.colorClass]} flex items-center justify-center text-base flex-shrink-0 mt-0.5`}>
                      {item.icon}
                    </div>

                    {/* Body */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[0.6rem] font-bold bg-emerald-500/12 text-emerald-300">
                          {item.frequency}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[0.6rem] font-bold bg-blue-500/10 text-blue-300">
                          {item.cost}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — cards + chat */}
            <motion.div variants={slideInRightVariants} className="lg:w-[420px] flex-shrink-0 space-y-4">
              {/* Health info cards */}
              {HEALTH_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="glass rounded-2xl p-5 border border-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{card.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{card.title}</h4>
                      <p className="text-white/35 text-[0.65rem]">{card.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-white/45 text-xs leading-relaxed">{card.body}</p>
                </div>
              ))}

              {/* AI Chat mockup */}
              <div className="bg-gradient-to-b from-emerald-950/30 to-obsidian-900 rounded-2xl p-5 border border-emerald-500/12">
                <p className="text-white/30 text-[0.6rem] font-bold uppercase tracking-wider mb-4">Health AI Chat</p>
                <div className="space-y-3">
                  {CHAT_MESSAGES.map((msg, i) => (
                    <div key={i} className={msg.role === "user" ? "text-right" : ""}>
                      {msg.role === "ai" && (
                        <p className="text-emerald-300 text-[0.5rem] font-bold mb-0.5">{msg.label}</p>
                      )}
                      <div
                        className={`inline-block rounded-2xl px-3 py-2 text-[0.65rem] leading-relaxed max-w-[90%] ${
                          msg.role === "ai"
                            ? "bg-emerald-500/15 border border-emerald-500/20 text-white/80 rounded-bl-sm text-left"
                            : "bg-violet-500/20 border border-violet-500/15 text-white/75 rounded-br-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Prevention banner */}
          <motion.div
            variants={fadeUpVariants}
            className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-emerald-950/60 to-obsidian-800 border border-emerald-500/15 flex flex-col sm:flex-row items-center gap-8 shadow-xl shadow-emerald-900/20"
          >
            <div className="flex-1 space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">
                ₹2,000 in prevention saves ₹20,000 in treatment
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Students who follow preventive health schedules spend 12x less on medical emergencies. Sakhi automates this for you.
              </p>
            </div>
            <div className="flex gap-8 flex-shrink-0">
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-emerald-300 leading-none">₹2.4L</p>
                <p className="text-white/35 text-xs mt-1">Annual savings</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-emerald-300 leading-none">12×</p>
                <p className="text-white/35 text-xs mt-1">Cheaper than crisis</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
