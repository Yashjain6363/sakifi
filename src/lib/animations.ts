import type { Variants, Transition } from "framer-motion";

// ─── Base Transitions ────────────────────────────────────────────────────────

export const smoothTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

export const snappyTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const gentleTransition: Transition = {
  duration: 0.7,
  ease: [0.25, 0.1, 0.25, 1],
};

export const dramaticTransition: Transition = {
  duration: 1.1,
  ease: [0.16, 1, 0.3, 1],
};

// ─── Reveal Variants ─────────────────────────────────────────────────────────

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: gentleTransition,
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: dramaticTransition,
  },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: gentleTransition,
  },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: gentleTransition,
  },
};

// ─── Container/Stagger Variants ───────────────────────────────────────────────

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFastVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// ─── Card Variants ────────────────────────────────────────────────────────────

export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    transition: snappyTransition,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: snappyTransition,
  },
};

// ─── Orb / Blob Variants ──────────────────────────────────────────────────────

export const orbFloatVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// ─── Reduced Motion Helpers ───────────────────────────────────────────────────

export function getReducedVariants(variants: Variants): Variants {
  const reduced: Variants = {};
  for (const key in variants) {
    const variant = variants[key];
    if (typeof variant === "object" && !Array.isArray(variant)) {
      reduced[key] = {
        ...variant,
        transition: { duration: 0.01 },
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
      };
    }
  }
  return reduced;
}

// ─── Viewport Config ──────────────────────────────────────────────────────────

export const defaultViewport = {
  once: true,
  amount: 0.2,
} as const;