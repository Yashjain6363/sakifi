/**
 * Local Sakhi reply engine — no external LLM.
 * Intent scoring + curated templates for periods & student finance (India context).
 * Not medical or investment advice.
 */

import {
  cycleDaysFromRegularity,
  estimateNextPeriodStart,
  suggestMonthlySipInr,
} from "@/lib/period-and-plan";

export type ChatTurn = { role: "user" | "assistant"; content: string };

const MEDICAL_DISCLAIMER =
  "This is general wellness info, not medical advice — see a doctor for pain, heavy bleeding, or anything worrying.";
const FINANCE_DISCLAIMER =
  "Educational only, not regulated investment advice — check suitability with a SEBI-registered advisor.";

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .trim();
}

/** Crisis / urgent — override all other intents */
function crisisReply(text: string): string | null {
  const n = norm(text);
  const crisis =
    /\b(suicide|kill myself|end my life|self harm|self-harm|cutting myself)\b/.test(
      n
    ) ||
    /\b(can't breathe|cannot breathe|chest pain|heart attack)\b/.test(n) ||
    /\b(unconscious|passed out|fainting)\b/.test(n) ||
    /\b(bleeding heavily|soaking through|miscarriage)\b/.test(n);
  if (!crisis) return null;
  return [
    "If you’re in immediate danger, call **112** (India) or your local emergency number, or go to the nearest hospital.",
    "If you’re thinking about hurting yourself, please reach out now — talk to someone you trust, your campus counsellor, or a crisis line in your area.",
    MEDICAL_DISCLAIMER,
  ].join("\n\n");
}

function extractIsoDate(text: string): string | null {
  const n = text.trim();
  const iso = n.match(/\b(\d{4}-\d{2}-\d{2})\b/);
  if (iso) return iso[1];
  const dmy = n.match(/\b(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})\b/);
  if (dmy) {
    let d = parseInt(dmy[1], 10);
    let m = parseInt(dmy[2], 10);
    let y = parseInt(dmy[3], 10);
    if (y < 100) y += y < 50 ? 2000 : 1900;
    if (m > 12 && d <= 12) [d, m] = [m, d];
    if (m < 1 || m > 12 || d < 1 || d > 31) return null;
    const pad = (x: number) => String(x).padStart(2, "0");
    return `${y}-${pad(m)}-${pad(d)}`;
  }
  return null;
}

type Bucket =
  | "period_next"
  | "period_general"
  | "pms"
  | "sip"
  | "budget"
  | "scam"
  | "emergency"
  | "wellness"
  | "greeting"
  | "afford"
  | "literacy"
  | "loan";

const KEYWORDS: Record<Bucket, readonly string[]> = {
  period_next: [
    "next period",
    "when will i get",
    "period due",
    "cycle length",
    "ovulation",
    "late period",
    "missed period",
    "last period",
  ],
  period_general: [
    "period",
    "menstruat",
    "menstrual",
    "cycle",
    "tampon",
    "pad",
    "period blood",
  ],
  pms: [
    "pms",
    "cramps",
    "cramping",
    "bloating",
    "mood swing",
    "breast tender",
    "pmt",
  ],
  sip: [
    "sip",
    "mutual fund",
    "mf",
    "index fund",
    "nifty",
    "invest monthly",
    "lumpsum",
    "folio",
  ],
  budget: [
    "budget",
    "save money",
    "spending",
    "allowance",
    "pocket money",
    "upi",
    "expense",
    "hostel",
    "mess",
  ],
  scam: [
    "scam",
    "fraud",
    "fake job",
    "otp",
    "phishing",
    "kyc link",
    "telegram money",
    "investment scheme",
  ],
  emergency: [
    "emergency fund",
    "rainy day",
    "savings account",
    "liquid fund",
    "buffer",
  ],
  wellness: [
    "stress",
    "anxiety",
    "sleep",
    "tired",
    "burnout",
    "exam stress",
    "depressed",
    "lonely",
  ],
  greeting: ["hi", "hello", "hey", "namaste", "good morning", "good evening"],
  afford: [
    "afford",
    "should i buy",
    "impulse buy",
    "worth it",
    "regret buying",
    "can i buy",
  ],
  literacy: [
    "credit score",
    "cibil",
    "financial literacy",
    "tds",
    "income tax",
    "pan card",
    "insurance term",
  ],
  loan: [
    "loan app",
    "personal loan",
    "emi",
    "instant loan",
    "predatory",
    "recovery agent",
  ],
};

/** Strong multi-word signals — beat single-keyword noise */
const PHRASE_SIGNALS: ReadonlyArray<{
  phrase: string;
  bucket: Bucket;
  weight: number;
}> = [
  { phrase: "can i afford", bucket: "afford", weight: 8 },
  { phrase: "should i buy", bucket: "afford", weight: 7 },
  { phrase: "next period", bucket: "period_next", weight: 6 },
  { phrase: "last period", bucket: "period_next", weight: 5 },
  { phrase: "credit score", bucket: "literacy", weight: 7 },
  { phrase: "emergency fund", bucket: "emergency", weight: 7 },
  { phrase: "fake job", bucket: "scam", weight: 6 },
  { phrase: "loan app", bucket: "loan", weight: 7 },
  { phrase: "mutual fund", bucket: "sip", weight: 5 },
];

function scoreBuckets(text: string): Map<Bucket, number> {
  const n = norm(text);
  const scores = new Map<Bucket, number>();
  (Object.keys(KEYWORDS) as Bucket[]).forEach((b) => {
    let s = 0;
    for (const kw of KEYWORDS[b]) {
      if (n.includes(kw)) s += kw.split(/\s+/).length >= 2 ? 3 : 2;
    }
    if (s > 0) scores.set(b, s);
  });
  for (const { phrase, bucket, weight } of PHRASE_SIGNALS) {
    if (n.includes(phrase)) {
      scores.set(bucket, (scores.get(bucket) ?? 0) + weight);
    }
  }
  return scores;
}

function pickTop(
  scores: Map<Bucket, number>
): { bucket: Bucket; score: number } | null {
  let best: { bucket: Bucket; score: number } | null = null;
  for (const [bucket, score] of scores) {
    if (!best || score > best.score) best = { bucket, score };
  }
  return best && best.score >= 2 ? best : null;
}

function isGreetingOnly(text: string, scores: Map<Bucket, number>): boolean {
  const n = norm(text);
  if (n.length > 48) return false;
  const g = scores.get("greeting") ?? 0;
  return g >= 2 && scores.size <= 2;
}

function periodNextReply(userText: string): string {
  const date = extractIsoDate(userText);
  const cycleDays = cycleDaysFromRegularity("regular");
  if (date) {
    const next = estimateNextPeriodStart(date, cycleDays);
    if (next) {
      return [
        `If your last period started **${date}** and cycles are roughly **${cycleDays} days** (many people vary — this is only a rough guess), your next period might land around **${next}**.`,
        "Track 3–6 cycles on a calendar or app for a better personal average.",
        MEDICAL_DISCLAIMER,
      ].join("\n\n");
    }
  }
  return [
    "To estimate your next period, I need your **last period start date** (first day of bleeding). You can write it like **2025-03-01** or **15/03/2025**.",
    "Typical cycles are about **21–35 days** — if yours are often shorter/longer, use that range when guessing.",
    MEDICAL_DISCLAIMER,
  ].join("\n\n");
}

function periodGeneralReply(): string {
  return [
    "**Basics:** change pads/tampons regularly, wash hands, stay hydrated. Cramps: gentle heat (bottle), light movement, and rest if you need it.",
    "**Money-wise:** stock pads when there’s a sale; split a bulk pack with a flatmate if it helps. Period products are essential — budget a small fixed line for them.",
    MEDICAL_DISCLAIMER,
  ].join("\n\n");
}

function pmsReply(): string {
  return [
    "PMS can show up as cramps, mood dips, cravings, or bloating — everyone’s different.",
    "**Food:** steady meals (dal–rice–sabzi), fruit, curd; for cravings, try jaggery + peanuts, fruit chaat, or roasted makhana instead of only packaged snacks.",
    "**Money:** keep a small weekly “comfort” budget in UPI so treats don’t derail everything.",
    MEDICAL_DISCLAIMER,
  ].join("\n\n");
}

function sipReply(userText: string): string {
  const nums = userText.match(/\b(\d{3,7})\b/g);
  const salary = nums
    ? Math.max(...nums.map((x) => parseInt(x, 10)).filter((n) => n >= 1000))
    : 0;
  const goal: "emergency" | "growth" | "short_term" = /\b(growth|long|retire|wealth)\b/i.test(
    userText
  )
    ? "growth"
    : /\b(short|1 year|2 year|trip|phone)\b/i.test(userText)
      ? "short_term"
      : "emergency";
  if (salary > 0) {
    const { suggested, note } = suggestMonthlySipInr(salary, goal);
    return [
      `For **₹${salary.toLocaleString("en-IN")}/month** in hand and a **${goal.replace("_", " ")}**-style goal, a rough educational starting point might be around **₹${suggested.toLocaleString("en-IN")}/month** SIP — ${note}`,
      "Start small, automate on salary day, and keep **3–6 months of expenses** liquid before locking long-term money.",
      FINANCE_DISCLAIMER,
    ].join("\n\n");
  }
  return [
    "**SIPs (India):** small fixed amounts into mutual funds on a schedule — useful for habit-building, not a return promise.",
    "Pick **direct** plans, watch expense ratio, and match the fund type to your goal (liquid for emergency, equity index for long horizon — broadly speaking).",
    "If you share **monthly money in hand** (₹) and **goal** (emergency vs growth vs short-term), I can suggest a rough monthly range.",
    FINANCE_DISCLAIMER,
  ].join("\n\n");
}

function budgetReply(): string {
  return [
    "**Student budget (simple):** fixed costs first (rent/mess/phone), then **₹500–2000** “fun/food out” depending on income, then save **even ₹100/week** into a separate UPI bank account.",
    "Use **UPI mandates** or bank rules to move savings on day 1 — you won’t miss what you don’t see.",
    "Feeling guilty about spending? Name one “worth it” spend per week so money feels intentional, not shameful.",
    FINANCE_DISCLAIMER,
  ].join("\n\n");
}

function scamReply(): string {
  return [
    "**Red flags:** “pay a fee to get a job”, random **OTP** calls, links that look like bank/KYC, Telegram “investment” groups with guaranteed returns.",
    "**Rules:** never share **OTP** or **UPI PIN**; type bank URLs yourself; if it’s urgent and emotional, it’s probably a scam.",
    "If you already paid someone suspicious, call your bank **immediately** and note the transaction ID.",
    FINANCE_DISCLAIMER,
  ].join("\n\n");
}

function emergencyFundReply(): string {
  return [
    "Aim for **3–6 months of essential expenses** in a **savings account** or liquid fund you can access in a day — before aggressive investing.",
    "If you’re a student, even **₹2,000–5,000** set aside can soften a phone repair or travel emergency.",
    FINANCE_DISCLAIMER,
  ].join("\n\n");
}

function wellnessReply(): string {
  return [
    "Money stress and burnout often show up as bad sleep, skipping meals, or doom-scrolling — you’re not “weak”, you’re overloaded.",
    "Try: **one** walk after class, **one** meal at the same time daily, and **10 minutes** offline before bed.",
    "If mood stays very low for weeks or you have thoughts of self-harm, please talk to a counsellor or doctor — that’s strength, not weakness.",
    MEDICAL_DISCLAIMER,
  ].join("\n\n");
}

function greetingReply(): string {
  return [
    "Hi — I’m **Sakhi** (offline mode). Ask me about **periods & cravings**, **budgeting & UPI**, **SIPs**, **emergency funds**, or **scams** — I’ll keep answers short and India-relevant.",
    MEDICAL_DISCLAIMER + " " + FINANCE_DISCLAIMER,
  ].join("\n\n");
}

function affordReply(): string {
  return [
    "Before **“can I afford this?”**: subtract fixed costs + small savings, then see what’s left for the week.",
    "If the buy is **>10% of monthly money in hand**, sleep on it 24–48 hours — most impulse buys lose shine overnight.",
    "Still want it? Trade something else off (one less delivery meal, one subscription) so it’s a swap, not a pile-on.",
    FINANCE_DISCLAIMER,
  ].join("\n\n");
}

function literacyReply(): string {
  return [
    "**Credit score (CIBIL etc.):** pay card/loan EMIs on time, don’t max out cards, keep old accounts open — builds history slowly.",
    "**PAN + bank:** never share OTP; verify letters from banks on official apps only.",
    "For **tax/TDS** as a student: stipends and scholarships often have rules — check Form 16 if you intern; use free ITR tools if you file.",
    FINANCE_DISCLAIMER,
  ].join("\n\n");
}

function loanTrapReply(): string {
  return [
    "**Instant loan apps:** tiny loans, huge fees, aggressive recovery — RBI has cracked down, but traps still exist. Prefer family/college aid or a scheduled bank if you must borrow.",
    "Read **APR**, not just “low EMI”. If they ask for **contacts access** or **nudes as collateral**, it’s illegal — stop and report.",
    FINANCE_DISCLAIMER,
  ].join("\n\n");
}

function fallbackReply(): string {
  return [
    "I work best on **periods/PMS**, **budgeting**, **SIPs**, **emergency savings**, **scam safety**, **affordability checks**, and **basic money literacy** (India).",
    "Try: “**My last period was 2025-03-01 — next?**”, “**Can I afford shoes for ₹4,000?**”, or “**Is this internship message a scam?**”",
    MEDICAL_DISCLAIMER + " " + FINANCE_DISCLAIMER,
  ].join("\n\n");
}

/**
 * Produce assistant reply from conversation (last message must be user).
 */
export function localSakhiReply(messages: ChatTurn[]): string {
  if (messages.length === 0) return greetingReply();
  const last = messages[messages.length - 1];
  if (last.role !== "user") return greetingReply();

  const userText = last.content;
  const crisis = crisisReply(userText);
  if (crisis) return crisis;

  const recentUser = messages
    .filter((m) => m.role === "user")
    .slice(-3)
    .map((m) => m.content)
    .join(" ");
  /** Weight last turn higher so follow-ups stay on-topic */
  const combined = `${recentUser} ${userText} ${userText}`;

  const scores = scoreBuckets(combined);
  if (isGreetingOnly(userText, scores)) return greetingReply();

  const dateInMessage = extractIsoDate(userText);
  if (
    dateInMessage &&
    /\b(period|cycle|next|when)\b/i.test(userText)
  ) {
    return periodNextReply(userText);
  }

  const top = pickTop(scores);
  if (!top) {
    if (/\b(period|cycle|menstruat)\b/i.test(userText)) return periodGeneralReply();
    return fallbackReply();
  }

  switch (top.bucket) {
    case "greeting":
      return greetingReply();
    case "period_next":
      return periodNextReply(userText);
    case "period_general":
      return periodGeneralReply();
    case "pms":
      return pmsReply();
    case "sip":
      return sipReply(userText);
    case "budget":
      return budgetReply();
    case "scam":
      return scamReply();
    case "emergency":
      return emergencyFundReply();
    case "wellness":
      return wellnessReply();
    case "afford":
      return affordReply();
    case "literacy":
      return literacyReply();
    case "loan":
      return loanTrapReply();
    default:
      return fallbackReply();
  }
}
