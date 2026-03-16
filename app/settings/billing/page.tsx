"use client";

import { useState } from "react";
import {
  CreditCard,
  Calendar,
  Zap,
  Shield,
  Building2,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

// ─── Mock subscription data (replace with real fetch from your DB) ───────────
const mockSubscription = {
  plan: "pro",
  status: "active", // active | trialing | past_due | cancelled
  interval: "monthly",
  currentPeriodEnd: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000), // 18 days from now
  trialEndsAt: null,
  stripeCustomerId: "cus_mock123",
  cancelAtPeriodEnd: false,
  queriesUsed: 48320,
  queriesLimit: null, // null = unlimited
  seats: 12,
  seatsLimit: 50,
  storageUsedGB: 34,
  storageLimitGB: 100,
};

const planMeta: Record<
  string,
  { name: string; icon: React.ElementType; color: string; gradient: string }
> = {
  free: { name: "Free", icon: Sparkles, color: "text-slate-400", gradient: "from-slate-400 to-slate-600" },
  starter: { name: "Starter", icon: Zap, color: "text-sky-400", gradient: "from-sky-400 to-blue-600" },
  pro: { name: "Professional", icon: Shield, color: "text-violet-400", gradient: "from-violet-500 to-purple-700" },
  enterprise: { name: "Enterprise", icon: Building2, color: "text-amber-400", gradient: "from-amber-400 to-orange-600" },
};

function UsageBar({ used, limit, label }: { used: number; limit: number | null; label: string }) {
  const pct = limit ? Math.min((used / limit) * 100, 100) : 0;
  const isHigh = pct > 80;

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs text-white/60">
          {limit === null ? `${used.toLocaleString()} (unlimited)` : `${used.toLocaleString()} / ${limit.toLocaleString()}`}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        {limit !== null && (
          <div
            className={`h-full rounded-full transition-all ${isHigh ? "bg-red-500" : "bg-violet-500"}`}
            style={{ width: `${pct}%` }}
          />
        )}
        {limit === null && (
          <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full opacity-40" />
        )}
      </div>
    </div>
  );
}

export default function BillingPage() {
  const sub = mockSubscription;
  const meta = planMeta[sub.plan];
  const Icon = meta.icon;

  const [portalLoading, setPortalLoading] = useState(false);

  const openPortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: sub.stripeCustomerId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setPortalLoading(false);
    }
  };

  const statusBadge = {
    active: { label: "Active", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
    trialing: { label: "Trial", className: "bg-sky-500/15 text-sky-400 border-sky-500/20" },
    past_due: { label: "Past due", className: "bg-red-500/15 text-red-400 border-red-500/20" },
    cancelled: { label: "Cancelled", className: "bg-white/10 text-white/40 border-white/10" },
  }[sub.status];

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Subtle bg grid */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="fixed top-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Georgia', serif" }}>
            Billing & Subscription
          </h1>
          <p className="text-sm text-white/40">Manage your plan, usage, and payment details.</p>
        </div>

        <div className="grid gap-4">
          {/* Current plan card */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
            <div className={`h-1 w-full bg-gradient-to-r ${meta.gradient}`} />
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="text-lg font-bold text-white">{meta.name} Plan</h2>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusBadge?.className}`}>
                        {statusBadge?.label}
                      </span>
                    </div>
                    <p className="text-sm text-white/40 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Renews on{" "}
                      {sub.currentPeriodEnd.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="/pricing"
                    className="flex items-center gap-1.5 px-4 py-2 bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl text-xs font-semibold text-white/70 hover:text-white transition-all"
                  >
                    Change plan
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                  <button
                    onClick={openPortal}
                    disabled={portalLoading}
                    className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50"
                  >
                    {portalLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <CreditCard className="w-3 h-3" />}
                    Manage billing
                  </button>
                </div>
              </div>

              {sub.cancelAtPeriodEnd && (
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  Your subscription will cancel on{" "}
                  {sub.currentPeriodEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}.
                  <button className="underline ml-1 hover:text-amber-300">Reactivate</button>
                </div>
              )}
            </div>
          </div>

          {/* Usage */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-6">
            <h3 className="text-sm font-semibold text-white/70 mb-5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-violet-400" />
              Current usage
              <span className="text-white/30 font-normal text-xs ml-auto">Resets monthly</span>
            </h3>
            <div className="space-y-5">
              <UsageBar
                used={sub.queriesUsed}
                limit={sub.queriesLimit}
                label="AI queries"
              />
              <UsageBar
                used={sub.seats}
                limit={sub.seatsLimit}
                label="Team seats"
              />
              <UsageBar
                used={sub.storageUsedGB}
                limit={sub.storageLimitGB}
                label="Storage (GB)"
              />
            </div>
          </div>

          {/* Plan features summary */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-6">
            <h3 className="text-sm font-semibold text-white/70 mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Included in your plan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "All ERP modules",
                "Unlimited AI queries",
                "Priority support (8h SLA)",
                "Custom dashboards",
                "Role-based access control",
                "Audit logs",
                "SSO (Google, Microsoft)",
                "100 GB storage",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade nudge for non-enterprise */}
          {sub.plan !== "enterprise" && (
            <div className="rounded-2xl border border-amber-500/15 bg-amber-950/20 backdrop-blur-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white/80 mb-0.5">Need more scale?</p>
                <p className="text-xs text-white/40">
                  Enterprise plans include unlimited users, on-premise deployment, and a dedicated success manager.
                </p>
              </div>
              <Link
                href="/contact?plan=enterprise"
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl transition-all"
              >
                Talk to sales <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}