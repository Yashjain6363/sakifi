"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { TESTIMONIALS } from "@/lib/constants";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Student testimonials"
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/8 to-transparent" />
      <GlowOrb color="rose" size="xl" className="-top-24 left-1/3" intensity="low" />

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
            <SectionLabel variant="rose">Student Stories</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              Real students, real transformation
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light"
            >
              From first login to daily habits — hear from students who tested SakhiFi.
            </motion.p>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.article
                key={testimonial.id}
                variants={fadeUpVariants}
                className={`glass rounded-2xl p-7 border border-white/[0.08] space-y-5 hover:border-rose-500/15 transition-all duration-300 ${index === 0 ? "sm:row-span-1" : ""}`}
              >
                {/* Stars */}
                <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-rose-400 text-rose-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote>
                  <p className="text-white/75 leading-relaxed text-sm">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-1 border-t border-white/[0.06]">
                  <div
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    aria-hidden="true"
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.name}</p>
                    <p className="text-white/40 text-xs">
                      {testimonial.role} · {testimonial.college}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}