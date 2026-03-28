"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Trash2, Wallet, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { formatInrFromPaise, parseInrInputToPaise } from "@/lib/inr";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/budget-schema";
import {
  EXPENSE_CATEGORY_LABELS,
  INCOME_CATEGORY_LABELS,
} from "@/lib/budget-labels";
import type { BudgetEntryRow, BudgetSummary } from "@/types/budget";

type ApiList = {
  ok: boolean;
  entries?: BudgetEntryRow[];
  summary?: BudgetSummary;
  range?: { from: string; to: string };
  error?: string;
};

function localMonthRange(): { from: string; to: string } {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const pad = (n: number) => String(n).padStart(2, "0");
  const from = `${y}-${pad(m + 1)}-01`;
  const to = `${y}-${pad(m + 1)}-${pad(now.getDate())}`;
  return { from, to };
}

function CategoryBars({
  expenseByCategoryPaise,
}: {
  expenseByCategoryPaise: Record<string, number>;
}) {
  const pairs = Object.entries(expenseByCategoryPaise).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...pairs.map(([, v]) => v), 1);
  if (pairs.length === 0) return null;
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
        Spending by category
      </p>
      <ul className="space-y-2.5">
        {pairs.map(([cat, paise]) => {
          const pct = Math.round((paise / max) * 100);
          const label =
            EXPENSE_CATEGORY_LABELS[cat as keyof typeof EXPENSE_CATEGORY_LABELS] ??
            cat;
          return (
            <li key={cat}>
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>{label}</span>
                <span className="tabular-nums text-white/90">
                  {formatInrFromPaise(paise)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500/80 to-violet-500/70"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RunningBalanceChart({
  dailyNetPaise,
}: {
  dailyNetPaise: { date: string; netPaise: number }[];
}) {
  if (dailyNetPaise.length < 2) return null;
  const values = dailyNetPaise.map((d) => d.netPaise);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 0);
  const span = Math.max(max - min, 1);
  const w = 320;
  const h = 100;
  const pad = 8;
  const points = dailyNetPaise
    .map((d, i) => {
      const x = pad + (i / (dailyNetPaise.length - 1)) * (w - pad * 2);
      const t = (d.netPaise - min) / span;
      const y = h - pad - t * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
        Running balance (net of income − expenses)
      </p>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full max-h-28 text-emerald-400/90"
        aria-hidden
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />
      </svg>
      <p className="text-[0.65rem] text-white/35">
        Line shows cumulative net for each day in the selected range (starts at 0).
      </p>
    </div>
  );
}

export function BudgetSection() {
  const [range, setRange] = useState(localMonthRange);
  const [entries, setEntries] = useState<BudgetEntryRow[]>([]);
  const [summary, setSummary] = useState<BudgetSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [tab, setTab] = useState<"expense" | "income">("expense");
  const [amountRaw, setAmountRaw] = useState("");
  const [category, setCategory] = useState<string>("food");
  const [note, setNote] = useState("");
  const [occurredOn, setOccurredOn] = useState(() => localMonthRange().to);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setFetchError(null);
    setLoading(true);
    try {
      if (range.from > range.to) {
        setFetchError("Start date must be on or before end date.");
        setEntries([]);
        setSummary(null);
        setLoading(false);
        return;
      }
      const q = new URLSearchParams({ from: range.from, to: range.to });
      const res = await fetch(`/api/budget/entries?${q}`, {
        credentials: "include",
      });
      const data = (await res.json()) as ApiList;
      if (res.status === 401) {
        setFetchError("sign_in");
        setEntries([]);
        setSummary(null);
        return;
      }
      if (!res.ok || !data.ok || !data.entries || !data.summary) {
        setFetchError(data.error ?? "Could not load budget.");
        setEntries([]);
        setSummary(null);
        return;
      }
      setEntries(data.entries);
      setSummary(data.summary);
    } catch {
      setFetchError("Network error.");
      setEntries([]);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  }, [range.from, range.to]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setCategory(tab === "expense" ? "food" : "pocket_money");
  }, [tab]);

  const totals = useMemo(() => {
    if (!summary) return null;
    return {
      income: formatInrFromPaise(summary.totalIncomePaise),
      expense: formatInrFromPaise(summary.totalExpensePaise),
      net: formatInrFromPaise(summary.netPaise),
    };
  }, [summary]);

  async function submitEntry(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = parseInrInputToPaise(amountRaw);
    if ("error" in parsed) {
      setFormError(parsed.error);
      return;
    }
    const amountInr = parsed.paise / 100;
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
      const data = (await res.json()) as { ok?: boolean; error?: string; issues?: unknown };
      if (res.status === 401) {
        setFormError("Please sign in to save entries.");
        return;
      }
      if (!res.ok || !data.ok) {
        setFormError(data.error ?? "Could not save.");
        return;
      }
      setAmountRaw("");
      setNote("");
      await load();
    } catch {
      setFormError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this entry?")) return;
    const res = await fetch(`/api/budget/entries/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      alert(data.error ?? "Could not delete.");
      return;
    }
    await load();
  }

  if (fetchError === "sign_in") {
    return (
      <section
        id="budget"
        className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-rose-950/20 via-obsidian-900/40 to-violet-950/20 p-6 sm:p-8"
      >
        <h2 className="text-lg font-semibold text-white mb-2">Budget</h2>
        <p className="text-sm text-white/55 mb-4">
          Sign in to track pocket money, expenses, and see your month at a glance.
        </p>
        <Button asChild>
          <a href="/login?next=/dashboard#budget">Sign in</a>
        </Button>
      </section>
    );
  }

  return (
    <section
      id="budget"
      className="rounded-3xl border border-white/[0.1] bg-gradient-to-br from-rose-950/25 via-obsidian-900/50 to-violet-950/25 p-6 sm:p-8 shadow-2xl shadow-black/40"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80 mb-1">
            Budget
          </p>
          <h2 className="text-xl font-semibold text-white">Money in & out</h2>
          <p className="text-sm text-white/45 mt-1 max-w-md">
            Add pocket money and expenses. Totals are calculated on the server — your data stays scoped to your account.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center text-xs text-white/50">
          <Label htmlFor="range-from" className="sr-only">
            From
          </Label>
          <Input
            id="range-from"
            type="date"
            value={range.from}
            onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
            className="w-auto h-9 bg-white/5 border-white/10 text-white text-xs"
          />
          <span>–</span>
          <Input
            type="date"
            value={range.to}
            onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
            className="w-auto h-9 bg-white/5 border-white/10 text-white text-xs"
          />
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-white/50 text-sm py-8">
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
          Loading your budget…
        </div>
      )}

      {!loading && fetchError && (
        <p className="text-sm text-red-400/90 mb-4" role="alert">
          {fetchError}
        </p>
      )}

      {!loading && !fetchError && summary && entries.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 text-center mb-8">
          <Wallet className="w-10 h-10 mx-auto text-white/25 mb-3" aria-hidden />
          <p className="text-white/80 font-medium mb-1">No entries yet</p>
          <p className="text-sm text-white/45 max-w-sm mx-auto">
            Start by adding this month&apos;s allowance or one expense — you&apos;ll see charts fill in as you go.
          </p>
        </div>
      )}

      {!loading && summary && totals && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-3">
            <div className="flex items-center gap-2 text-emerald-300/80 text-xs font-medium mb-1">
              <TrendingUp className="w-3.5 h-3.5" aria-hidden />
              In (pocket money)
            </div>
            <p className="text-lg font-semibold tabular-nums text-white">{totals.income}</p>
          </div>
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 px-4 py-3">
            <div className="flex items-center gap-2 text-rose-300/80 text-xs font-medium mb-1">
              <TrendingDown className="w-3.5 h-3.5" aria-hidden />
              Out (expenses)
            </div>
            <p className="text-lg font-semibold tabular-nums text-white">{totals.expense}</p>
          </div>
          <div className="rounded-2xl border border-amber-500/25 bg-amber-950/25 px-4 py-3">
            <div className="text-amber-200/80 text-xs font-medium mb-1">Net</div>
            <p className="text-lg font-semibold tabular-nums text-white">{totals.net}</p>
          </div>
        </div>
      )}

      {!loading && summary && entries.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CategoryBars expenseByCategoryPaise={summary.expenseByCategoryPaise} />
          <RunningBalanceChart dailyNetPaise={summary.dailyNetPaise} />
        </div>
      )}

      <form
        onSubmit={(e) => void submitEntry(e)}
        className="rounded-2xl border border-white/[0.08] bg-obsidian-950/40 p-4 sm:p-5 space-y-4"
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab("expense")}
            className={cn(
              "flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors",
              tab === "expense"
                ? "bg-rose-500/25 text-white border border-rose-400/30"
                : "bg-white/5 text-white/55 border border-transparent hover:bg-white/10"
            )}
          >
            Add expense
          </button>
          <button
            type="button"
            onClick={() => setTab("income")}
            className={cn(
              "flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors",
              tab === "income"
                ? "bg-emerald-500/20 text-white border border-emerald-400/30"
                : "bg-white/5 text-white/55 border border-transparent hover:bg-white/10"
            )}
          >
            Add pocket money
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="amt">Amount (₹)</Label>
            <Input
              id="amt"
              inputMode="decimal"
              placeholder="e.g. 500"
              value={amountRaw}
              onChange={(e) => setAmountRaw(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cat">Category</Label>
            <select
              id="cat"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white"
            >
              {(tab === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map(
                (c) => (
                  <option key={c} value={c} className="bg-obsidian-900">
                    {tab === "expense"
                      ? EXPENSE_CATEGORY_LABELS[c as keyof typeof EXPENSE_CATEGORY_LABELS]
                      : INCOME_CATEGORY_LABELS[c as keyof typeof INCOME_CATEGORY_LABELS]}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="day">Date</Label>
            <Input
              id="day"
              type="date"
              value={occurredOn}
              onChange={(e) => setOccurredOn(e.target.value)}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="note">Note (optional)</Label>
            <Input
              id="note"
              placeholder="Mess, chai, etc."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={500}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        {formError && (
          <p className="text-sm text-red-400/90" role="alert">
            {formError}
          </p>
        )}

        <Button type="submit" disabled={saving} className="w-full sm:w-auto">
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />
              Saving…
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" aria-hidden />
              Save entry
            </>
          )}
        </Button>
      </form>

      {!loading && entries.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white/85">Recent entries</h3>
            <span className="text-xs text-white/35">{entries.length} in range</span>
          </div>
          <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.06] overflow-hidden">
            {entries.slice(0, 50).map((row) => (
              <li
                key={row.id}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] text-sm"
              >
                <div className="min-w-0">
                  <p className="text-white/90 truncate">
                    {row.entry_type === "income" ? (
                      <span className="text-emerald-300/90">+</span>
                    ) : (
                      <span className="text-rose-300/90">−</span>
                    )}{" "}
                    {formatInrFromPaise(row.amount_paise)}
                    <span className="text-white/40 ml-2">
                      {row.entry_type === "income"
                        ? INCOME_CATEGORY_LABELS[
                            row.category as keyof typeof INCOME_CATEGORY_LABELS
                          ] ?? row.category
                        : EXPENSE_CATEGORY_LABELS[
                            row.category as keyof typeof EXPENSE_CATEGORY_LABELS
                          ] ?? row.category}
                    </span>
                  </p>
                  <p className="text-xs text-white/35 truncate">
                    {row.occurred_on}
                    {row.note ? ` · ${row.note}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void remove(row.id)}
                  className="rounded-lg p-2 text-white/35 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
                  aria-label="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
