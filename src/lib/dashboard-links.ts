/** Homepage section anchors — every major SakhiFi feature area */

export type SiteFeatureLink = {
  label: string;
  href: string;
  description: string;
  icon: string;
};

export const SITE_FEATURE_LINKS: SiteFeatureLink[] = [
  { label: "Hero", href: "/#hero", description: "Overview & CTA", icon: "✨" },
  { label: "Problem & solution", href: "/#problem", description: "Why SakhiFi exists", icon: "💡" },
  { label: "Smart budgeting", href: "/#budgeting", description: "AI budget coach", icon: "💰" },
  { label: "Features grid", href: "/#features", description: "All product features", icon: "🧩" },
  { label: "Unique features", href: "/#unique-features", description: "Personality, scams, income ideas", icon: "🧬" },
  { label: "Scam Shield", href: "/#scam-shield", description: "Fraud & UPI safety", icon: "🛡️" },
  { label: "Goals & savings", href: "/#goals", description: "Milestones & targets", icon: "🎯" },
  { label: "Dashboard preview", href: "/#dashboard", description: "What your dashboard can look like", icon: "📊" },
  { label: "Period wellness", href: "/#period-wellness", description: "Cycle, cravings, self-care", icon: "🌸" },
  { label: "Health agent", href: "/#health-agent", description: "Checkups & health costs", icon: "🩺" },
  { label: "Investment advisor", href: "/#investment-advisor", description: "SIPs & long-term basics", icon: "📈" },
  { label: "Gamification", href: "/#gamification", description: "XP, levels, streaks", icon: "🎮" },
  { label: "Financial literacy", href: "/#literacy", description: "Credit, loans, UPI literacy", icon: "📚" },
  { label: "How it works", href: "/#how-it-works", description: "4-step flow", icon: "⚙️" },
  { label: "Women-first privacy", href: "/#women-first", description: "Safety & data", icon: "👩" },
  { label: "Comparison", href: "/#comparison", description: "SakhiFi vs others", icon: "⚖️" },
  { label: "Testimonials", href: "/#testimonials", description: "Student stories", icon: "💬" },
  { label: "Get started", href: "/#get-started", description: "Sign up flow", icon: "🚀" },
  { label: "Contact", href: "/#contact", description: "Reach the team", icon: "📧" },
  { label: "FAQ", href: "/#faq", description: "Common questions", icon: "❓" },
];
