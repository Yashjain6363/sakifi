import type {
  NavItem,
  Feature,
  Testimonial,
  FAQItem,
  ComparisonItem,
  UniqueFeature,
  GamificationLevel,
  CheckupItem,
  StockRecommendation,
  SIPTableRow,
  DashboardGoal,
} from "@/types";

export const SITE_CONFIG = {
  name: "SakhiFi",
  tagline: "The AI Financial Coach for Students",
  description:
    "SakhiFi is an AI-powered financial coach built for Indian students — helping you budget smarter, avoid scams, build savings habits, and achieve financial independence.",
  url: "https://sakhifi.com",
  ogImage: "/images/og-image.png",
  email: "hello@sakhifi.com",
  social: {
    instagram: "https://instagram.com/sakhifi",
    linkedin: "https://linkedin.com/company/sakhifi",
    twitter: "https://twitter.com/sakhifi",
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "🌸 Wellness", href: "#period-wellness" },
  { label: "🩺 Health", href: "#health-agent" },
  { label: "📈 Invest", href: "#investment-advisor" },
  { label: "Testimonials", href: "#testimonials" },
];

export const TRUST_STATS = [
  { value: 50000, suffix: "+", label: "Students Onboarded" },
  { value: 98, suffix: "%", label: "Feel More Confident" },
  { value: 3.2, suffix: "x", label: "Better Savings Rate", decimal: true },
  { value: 100, suffix: "%", label: "Privacy Protected" },
] as const;

export const FEATURES: Feature[] = [
  {
    id: "budgeting",
    icon: "💰",
    title: "AI Budgeting Coach",
    description:
      "Sakhi learns your spending patterns and gives you a personalized monthly plan — not generic advice, but guidance built around your actual life.",
    gradient: "from-rose-500/20 to-rose-600/5",
  },
  {
    id: "scam-shield",
    icon: "🛡️",
    title: "Scam Shield",
    description:
      "AI-powered detection of financial scams targeting students. Get real-time alerts before you click, transfer, or trust the wrong person.",
    gradient: "from-violet-500/20 to-violet-600/5",
  },
  {
    id: "goals",
    icon: "🎯",
    title: "Goal Planning",
    description:
      "From emergency funds to that semester abroad — Sakhi builds an achievable savings plan with milestone tracking and gentle nudges.",
    gradient: "from-gold-DEFAULT/20 to-gold-dark/5",
  },
  {
    id: "afford",
    icon: "🤔",
    title: '"Can I Afford This?"',
    description:
      "Ask Sakhi before any purchase. Get an instant, honest answer based on your budget, goals, and financial health — not judgment, just clarity.",
    gradient: "from-rose-500/20 to-violet-500/10",
  },
  {
    id: "literacy",
    icon: "📚",
    title: "Financial Literacy",
    description:
      "Learn about credit scores, insurance, SIPs, and taxes through bite-sized, real-life lessons — not textbook theory.",
    gradient: "from-violet-500/20 to-rose-500/10",
  },
  {
    id: "privacy",
    icon: "🔒",
    title: "Women-First Privacy",
    description:
      "Your financial data is never sold. Built with end-to-end encryption, no third-party data sharing, and a privacy-first architecture.",
    gradient: "from-gold-DEFAULT/20 to-violet-500/10",
  },
  {
    id: "cashback",
    icon: "💸",
    title: "Cashback & Savings Tips",
    description:
      "Sakhi finds cashback, discounts, and savings opportunities you're missing every day.",
    gradient: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    id: "income",
    icon: "💼",
    title: "AI Income Recommender",
    description:
      "Tell Sakhi your skills and get personalized income opportunities — freelance, part-time, or side hustles.",
    gradient: "from-pink-500/20 to-pink-600/5",
  },
  {
    id: "nudges",
    icon: "🔔",
    title: "Smart Nudges",
    description:
      "Timely reminders, celebratory milestones, and gentle pushbacks when you're about to overspend.",
    gradient: "from-violet-500/20 to-rose-500/10",
  },
  {
    id: "period-wellness",
    icon: "🌸",
    title: "Period Wellness Companion",
    description:
      "Tracks your cycle, understands your cravings, and recommends healthy budget-friendly treats — self-care fully planned, guilt-free.",
    gradient: "from-pink-500/20 to-rose-500/10",
    isNew: true,
  },
  {
    id: "health-agent",
    icon: "🩺",
    title: "Health Concern Agent",
    description:
      "Preventive checkup reminders, medical expense forecasts, and a personalised health-finance plan — stay healthy, stay wealthy.",
    gradient: "from-emerald-500/20 to-teal-500/10",
    isNew: true,
  },
  {
    id: "investment-advisor",
    icon: "📈",
    title: "AI Investment Advisor",
    description:
      "SIP calculator, stock picks, mutual fund guidance — Warren Buffett-level wisdom, simplified for every student's budget.",
    gradient: "from-amber-500/20 to-yellow-500/10",
    isNew: true,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Tell Sakhi About Yourself",
    description:
      "Share your college, monthly allowance, existing expenses, and financial goals. Sakhi builds your personal financial profile in minutes.",
    icon: "👤",
  },
  {
    step: "02",
    title: "Get Your Personalized Plan",
    description:
      "Sakhi generates a smart budget, savings targets, and a scam-awareness checklist — all tailored to your life, not a template.",
    icon: "✨",
  },
  {
    step: "03",
    title: "Chat, Ask, Decide",
    description:
      "Ask anything anytime. \"Is this UPI link safe?\" \"Can I buy these shoes?\" \"How do I start a SIP?\" Sakhi answers with context and care.",
    icon: "💬",
  },
  {
    step: "04",
    title: "Watch Your Financial Health Grow",
    description:
      "Track progress toward goals, celebrate milestones, and build the money habits that will serve you for life — starting now.",
    icon: "📈",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Ananya Sharma",
    role: "3rd Year, B.Tech CSE",
    college: "IIT Delhi",
    quote:
      "SakhiFi helped me save ₹18,000 in three months without feeling deprived. The scam alerts alone saved me from a fake internship scheme.",
    avatar: "AS",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Nair",
    role: "MBA Student",
    college: "IIM Bangalore",
    quote:
      "I finally understand where my money goes. Sakhi is like a financially savvy best friend who never judges you for buying that coffee.",
    avatar: "PN",
    rating: 5,
  },
  {
    id: "3",
    name: "Meera Patel",
    role: "2nd Year, B.Com",
    college: "SRCC Delhi",
    quote:
      "The 'Can I afford this?' feature is everything. I use it before every purchase now. It's changed how I think about money completely.",
    avatar: "MP",
    rating: 5,
  },
  {
    id: "4",
    name: "Riya Krishnan",
    role: "Final Year, MBBS",
    college: "AIIMS Jodhpur",
    quote:
      "As a medical student with almost no time, Sakhi automates my financial planning. The privacy features give me peace of mind too.",
    avatar: "RK",
    rating: 5,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Is SakhiFi only for women?",
    answer:
      "SakhiFi is built with women students as the primary audience, with safety and privacy features designed around their specific needs. However, any student can use and benefit from the platform.",
  },
  {
    question: "How does Sakhi protect my financial data?",
    answer:
      "Your data is encrypted at rest and in transit. We never sell your data to third parties, never share with advertisers, and you can delete your account and all associated data at any time. We follow data minimization principles — we only collect what we need.",
  },
  {
    question: "Is SakhiFi free?",
    answer:
      "We'll offer a generous free tier for students, with premium features available at a student-friendly price. Early accounts may receive extended free access as a thank-you.",
  },
  {
    question: "How does the Scam Shield work?",
    answer:
      "Our AI is trained on thousands of known financial scam patterns targeting students in India — from fake UPI requests to fraudulent job offers to scholarship scams. Paste any message or link and Sakhi analyzes it in seconds.",
  },
  {
    question: "Will SakhiFi work with my college's financial systems?",
    answer:
      "We're building integrations with major banking apps and UPI platforms. You can also manually input transactions, and our AI still learns your patterns effectively.",
  },
  {
    question: "When will SakhiFi launch?",
    answer:
      "We're rolling out access in waves, starting with select college campuses. Create an account with email to get in line and complete your profile.",
  },
];

export const COMPARISON_ITEMS: ComparisonItem[] = [
  { feature: "Built specifically for students", sakhifi: true, others: false },
  { feature: "Women-first privacy design", sakhifi: true, others: false },
  { feature: "Scam detection & alerts", sakhifi: true, others: false },
  { feature: "AI conversation (ask anything)", sakhifi: true, others: false },
  { feature: '"Can I afford this?" assistant', sakhifi: true, others: false },
  { feature: "Indian context (UPI, SIP, INR)", sakhifi: true, others: false },
  { feature: "Zero data selling", sakhifi: true, others: "Varies" },
  { feature: "Financial literacy lessons", sakhifi: true, others: "Limited" },
];

export const SCAM_TYPES = [
  { icon: "📱", title: "Fake UPI Requests", description: "QR codes and payment links designed to drain your account" },
  { icon: "💼", title: "Fake Internship Offers", description: "Lucrative job offers that ask for registration fees upfront" },
  { icon: "🏦", title: "KYC Fraud", description: "Fake bank representatives asking to verify account details" },
  { icon: "🎓", title: "Scholarship Scams", description: "Too-good-to-be-true scholarships that harvest your personal data" },
  { icon: "💰", title: "Loan Trap Apps", description: "Predatory lending apps with hidden charges and data theft" },
  { icon: "🎰", title: "Investment Fraud", description: "Fake trading schemes promising guaranteed returns" },
];

export const UNIQUE_FEATURES: UniqueFeature[] = [
  {
    icon: "🧬",
    title: "Financial Personality Analysis",
    description:
      "Sakhi learns your money patterns and assigns you a financial personality — Saver, Spender, Planner, or Investor — then customizes every suggestion to match.",
    tag: "Proprietary AI Model",
  },
  {
    icon: "👩",
    title: "Women Financial Safety Mode",
    description:
      "A dedicated protection layer that monitors for financial abuse patterns, coercive payment requests, and unsafe financial relationships — designed for women's safety.",
    tag: "India-First Feature",
  },
  {
    icon: "🔍",
    title: "Scam Risk Detection Engine",
    description:
      "Our ML engine trained on 10,000+ Indian scam patterns. Detects fake job offers, UPI fraud, phishing, and Ponzi schemes before you fall victim.",
    tag: "98.4% Accuracy",
  },
  {
    icon: "💡",
    title: "Personalized Income Opportunities",
    description:
      "Based on your skills, schedule, and location, Sakhi recommends exactly how to earn more — from content creation to tutoring to micro-gigs.",
    tag: "Skill-Matched",
  },
  {
    icon: "🎮",
    title: "Gamified Financial Growth",
    description:
      "XP points, streaks, badges, and a progression system that makes managing money genuinely fun. Level up from Student to Independent to Investor.",
    tag: "10x Engagement",
  },
];

export const GAMIFICATION_LEVELS: GamificationLevel[] = [
  {
    badge: "🌱",
    name: "Student",
    xpRange: "0 — 500 XP",
    perks: ["Basic budgeting tools", "Daily financial tips", "Community access"],
  },
  {
    badge: "💰",
    name: "Saver",
    xpRange: "500 — 2K XP",
    perks: ["Goal tracking unlocked", "Savings challenges", "Custom badges"],
  },
  {
    badge: "⚡",
    name: "Achiever",
    xpRange: "2K — 5K XP",
    perks: ["Advanced analytics", "Priority AI responses", "Investment basics"],
    active: true,
  },
  {
    badge: "📈",
    name: "Investor",
    xpRange: "5K — 15K XP",
    perks: ["Stock recommendations", "SIP optimizer", "Portfolio tracking"],
  },
  {
    badge: "👑",
    name: "Independent",
    xpRange: "15K+ XP",
    perks: ["Full platform access", "Mentor status", "Exclusive features"],
  },
];

export const CHECKUP_ITEMS: CheckupItem[] = [
  {
    icon: "🩸",
    colorClass: "green",
    name: "Complete Blood Count",
    frequency: "Yearly",
    cost: "₹400-800",
    prevents: "Anaemia, infections",
    description: "Essential baseline test. Detects anaemia (common in students), infections, and nutritional deficiencies early.",
  },
  {
    icon: "🦷",
    colorClass: "blue",
    name: "Dental Checkup",
    frequency: "Every 6 months",
    cost: "₹300-500",
    prevents: "Cavities, gum disease",
    description: "Preventive dental care costs 10x less than treatment. Catches cavities before they become root canals.",
  },
  {
    icon: "👁️",
    colorClass: "orange",
    name: "Eye Examination",
    frequency: "Yearly",
    cost: "₹200-400",
    prevents: "Vision problems",
    description: "Screen time damage is real. Annual exams catch digital eye strain and prescription changes early.",
  },
  {
    icon: "🫀",
    colorClass: "rose",
    name: "Thyroid & Vitamin Panel",
    frequency: "Yearly",
    cost: "₹600-1200",
    prevents: "Fatigue, weight issues",
    description: "Thyroid disorders and Vitamin D/B12 deficiency are extremely common in young Indians. Early detection = easy management.",
  },
  {
    icon: "🧠",
    colorClass: "purple",
    name: "Mental Health Check-in",
    frequency: "As needed",
    cost: "₹500-1500",
    prevents: "Burnout, anxiety",
    description: "Student life is stressful. Regular mental health check-ins help you build resilience and catch burnout early.",
  },
];

export const SIP_TABLE_DATA: SIPTableRow[] = [
  { monthly: "₹500", years: "5 yrs", invested: "₹30,000", returns: "₹41,200" },
  { monthly: "₹1,000", years: "10 yrs", invested: "₹1,20,000", returns: "₹2,32,000" },
  { monthly: "₹2,000", years: "15 yrs", invested: "₹3,60,000", returns: "₹10,14,000", highlight: true },
  { monthly: "₹5,000", years: "20 yrs", invested: "₹12,00,000", returns: "₹49,95,000" },
];

export const STOCK_RECOMMENDATIONS: StockRecommendation[] = [
  { logo: "N", logoBg: "bg-blue-600", name: "Nifty 50 Index", type: "Index Fund", change: "+14.2%", changeDir: "up", tag: "Low Risk" },
  { logo: "P", logoBg: "bg-violet-600", name: "PPFAS Flexi Cap", type: "Mutual Fund", change: "+18.7%", changeDir: "up", tag: "Moderate" },
  { logo: "H", logoBg: "bg-rose-600", name: "HDFC Small Cap", type: "Mutual Fund", change: "+22.1%", changeDir: "up", tag: "High Growth" },
  { logo: "S", logoBg: "bg-emerald-600", name: "SBI Blue Chip", type: "Large Cap", change: "+12.4%", changeDir: "up", tag: "Stable" },
];

export const DASHBOARD_GOALS: DashboardGoal[] = [
  { emoji: "💻", name: "Laptop Fund", progress: 68 },
  { emoji: "✈️", name: "Goa Trip", progress: 35 },
  { emoji: "📦", name: "Emergency Fund", progress: 52 },
];

export const INVESTMENT_TIMELINE = [
  { age: "Age 18-22", width: "25%", color: "from-amber-500 to-amber-400", text: "₹500/mo", value: "₹41K" },
  { age: "Age 22-28", width: "45%", color: "from-amber-400 to-emerald-400", text: "₹2,000/mo", value: "₹3.2L" },
  { age: "Age 28-35", width: "70%", color: "from-emerald-400 to-teal-400", text: "₹5,000/mo", value: "₹18L" },
  { age: "Age 35-45", width: "95%", color: "from-teal-400 to-cyan-400", text: "₹10,000/mo", value: "₹72L" },
];