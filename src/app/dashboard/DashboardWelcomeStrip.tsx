"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

type Props = { showWelcome: boolean };

export function DashboardWelcomeStrip({ showWelcome }: Props) {
  const router = useRouter();
  const [visible, setVisible] = useState(showWelcome);

  useEffect(() => {
    if (!showWelcome) return;
    router.replace("/dashboard", { scroll: false });
  }, [showWelcome, router]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-100/95 flex items-start gap-3"
    >
      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" aria-hidden />
      <p>
        <span className="font-semibold text-white">You&apos;re in.</span> Your plan report is below.
        Explore every feature from here — you stay signed in until you choose Sign out.
      </p>
    </div>
  );
}
