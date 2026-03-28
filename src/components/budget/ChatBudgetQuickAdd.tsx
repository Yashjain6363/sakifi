"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { parseInrInputToPaise } from "@/lib/inr";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/budget-schema";
import {
  EXPENSE_CATEGORY_LABELS,
  INCOME_CATEGORY_LABELS,
} from "@/lib/budget-labels";

function monthRange(): { from: string; to: string } {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    from: `${y}-${pad(m + 1)}-01`,
    to: `${y}-${pad(m + 1)}-${pad(now.getDate())}`,
  };
}

export function ChatBudgetQuickAdd() {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState<"unknown" | "in" | "out">("unknown");
  const [tab, setTab] = useState<"expense" | "income">("expense");
  const [amountRaw, setAmountRaw] = useState("");
  const [category, setCategory] = useState("food");
  const [note, setNote] = useState("");
  const [occurredOn, setOccurredOn] = useState(() => monthRange().to);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    const { from, to } = monthRange();
    const res = await fetch(
      `/api/budget/entries?from=${from}&to=${to}`,
      { credentials: "include" }
    );
    setAuth(res.status === 401 ? "out" : "in");
  }, []);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    setCategory(tab === "expense" ? "food" : "pocket_money");
  }, [tab]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setToast(null);
    const p = parseInrInputToPaise(amountRaw);
    if ("error" in p) {
      setErr(p.error);
      return;
    }
    const amountInr = p.paise / 100;
    setSaving(true);
    try {
      const res = await fetch("/api/budget/entries", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryType: tab === "expense" ? "expense" : "income",
          amountInr,
          category,
          note: note.trim(),
          occurredOn,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.status === 401) {
        setAuth("out");
        setErr("Sign in to save.");
        return;
      }
      if (!res.ok || !data.ok) {
        setErr(data.error ?? "Could not save.");
        return;
      }
      setAmountRaw("");
      setNote("");
      setToast("Saved to your budget.");
      setTimeout(() => setToast(null), 3000);
    } catch {
      setErr("Network error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="border-b border-white/[0.08] bg-black/20">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-2 text-left text-xs text-white/55 hover:text-white/75 hover:bg-white/[0.04] transition-colors"
      >
        <span className="font-medium text-white/70">Budget quick add</span>
        {open ? (
          <ChevronUp className="w-4 h-4 shrink-0" aria-hidden />
        ) : (
          <ChevronDown className="w-4 h-4 shrink-0" aria-hidden />
        )}
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2">
          {auth === "out" && (
            <p className="text-[0.7rem] text-white/45 leading-snug">
              <Link
                href="/login?next=/dashboard#budget"
                className="text-violet-300 underline underline-offset-2"
              >
                Sign in
              </Link>{" "}
              to sync expenses and pocket money to your dashboard.
            </p>
          )}

          {auth === "in" && (
            <form onSubmit={(e) => void submit(e)} className="space-y-2">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setTab("expense")}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-[0.65rem] font-medium",
                    tab === "expense"
                      ? "bg-rose-500/25 text-white"
                      : "bg-white/5 text-white/50"
                  )}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setTab("income")}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-[0.65rem] font-medium",
                    tab === "income"
                      ? "bg-emerald-500/20 text-white"
                      : "bg-white/5 text-white/50"
                  )}
                >
                  Pocket
                </button>
              </div>
              <Input
                inputMode="decimal"
                placeholder="₹ Amount"
                value={amountRaw}
                onChange={(e) => setAmountRaw(e.target.value)}
                className="h-9 text-xs bg-white/5 border-white/10 text-white"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 rounded-md border border-white/10 bg-white/5 px-2 text-xs text-white"
              >
                {(tab === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map(
                  (c) => (
                    <option key={c} value={c} className="bg-obsidian-900">
                      {tab === "expense"
                        ? EXPENSE_CATEGORY_LABELS[
                            c as keyof typeof EXPENSE_CATEGORY_LABELS
                          ]
                        : INCOME_CATEGORY_LABELS[
                            c as keyof typeof INCOME_CATEGORY_LABELS
                          ]}
                    </option>
                  )
                )}
              </select>
              <Input
                type="date"
                value={occurredOn}
                onChange={(e) => setOccurredOn(e.target.value)}
                className="h-9 text-xs bg-white/5 border-white/10 text-white"
              />
              <Input
                placeholder="Note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={500}
                className="h-9 text-xs bg-white/5 border-white/10 text-white"
              />
              {err && (
                <p className="text-[0.65rem] text-red-400/90" role="alert">
                  {err}
                </p>
              )}
              {toast && (
                <p className="text-[0.65rem] text-emerald-400/90">{toast}</p>
              )}
              <div className="flex gap-2 items-center">
                <Button
                  type="submit"
                  size="sm"
                  className="flex-1 h-9 text-xs"
                  disabled={saving || auth !== "in"}
                >
                  {saving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Link
                  href="/dashboard#budget"
                  className="text-[0.65rem] text-violet-300/90 whitespace-nowrap"
                >
                  Dashboard →
                </Link>
              </div>
            </form>
          )}

          {auth === "unknown" && (
            <p className="text-[0.65rem] text-white/35 flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" aria-hidden />
              Checking session…
            </p>
          )}
        </div>
      )}
    </div>
  );
}
