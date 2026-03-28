"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin, Twitter } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { SITE_CONFIG } from "@/lib/constants";
import { staggerContainerVariants, fadeUpVariants, defaultViewport } from "@/lib/animations";

const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: SITE_CONFIG.social.instagram },
  { icon: Linkedin, label: "LinkedIn", href: SITE_CONFIG.social.linkedin },
  { icon: Twitter, label: "Twitter", href: SITE_CONFIG.social.twitter },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact us"
      className="relative py-28 overflow-hidden"
    >
      <GlowOrb color="violet" size="lg" className="-bottom-16 -right-16" intensity="low" />

      <div className="container-max section-padding">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="space-y-10 text-center max-w-2xl mx-auto"
        >
          <div className="space-y-5">
            <SectionLabel variant="violet">Get in Touch</SectionLabel>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl sm:text-5xl font-semibold leading-tight text-balance"
            >
              We'd love to hear from you
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 text-lg font-light leading-relaxed"
            >
              Whether you're a student, educator, investor, or just curious —
              reach out. We read every message.
            </motion.p>
          </div>

          {/* Email */}
          <motion.div variants={fadeUpVariants}>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-3 glass rounded-2xl px-8 py-5 border border-white/[0.1] hover:border-rose-500/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center group-hover:bg-rose-500/15 transition-colors">
                <Mail className="w-5 h-5 text-rose-400" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-sm">Email Us</p>
                <p className="text-white/40 text-xs">{SITE_CONFIG.email}</p>
              </div>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeUpVariants}
            className="flex items-center justify-center gap-4"
          >
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl glass border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
