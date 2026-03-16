"use client";

import { useState } from "react";
import { Check, Zap, Shield, Building2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "Free",
    icon: Sparkles,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "For individuals exploring AI-powered ERP",
    color: "from-slate-400 to-slate-600",
    badge: null,
    features: [
      "Up to 3 users",
      "1 module (Inventory or CRM)",
      "1,000 AI queries / month",
      "Community support",
      "Basic analytics",
      "2 GB storage",
    ],
    cta: "Get started free",
    href: "/auth/signup?plan=free",
    highlighted: false,
  },
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: "For small teams ready to automate operations",
    color: "from-sky-400 to-blue-600",
    badge: null,
    features: [
      "Up to 10 users",
      "3 modules included",
      "25,000 AI queries / month",
      "Email support (48h SLA)",
      "Advanced analytics",
      "25 GB storage",
      "API access",
      "Webhook integrations",
    ],
    cta: "Start free trial",
    href: "/auth/signup?plan=starter",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Professional",
    icon: Shield,
    monthlyPrice: 79,
    yearlyPrice: 63,
    description: "For growing businesses that need full ERP power",
    color: "from-violet-500 to-purple-700",
    badge: "Most Popular",
    features: [
      "Up to 50 users",
      "All modules included",
      "Unlimited AI queries",
      "Priority support (8h SLA)",
      "Custom dashboards",
      "100 GB storage",
      "Full API + webhooks",
      "Role-based access control",
      "Audit logs",
      "SSO (Google, Microsoft)",
    ],
    cta: "Start free trial",
    href: "/auth/signup?plan=pro",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    monthlyPrice: null,
    yearlyPrice: null,
    description: "For large organizations with custom requirements",
    color: "from-amber-400 to-orange-600",
    badge: null,
    features: [
      "Unlimited users",
      "All modules + custom builds",
      "Unlimited AI queries",
      "Dedicated support (1h SLA)",
      "White-label option",
      "Unlimited storage",
      "On-premise deployment",
      "Custom integrations",
      "Advanced security & compliance",
      "SLA guarantees",
      "Dedicated success manager",
    ],
    cta: "Contact sales",
    href: "/contact?plan=enterprise",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I change plans at any time?",
    a: "Yes. Upgrades take effect immediately (prorated). Downgrades take effect at the end of your billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, ACH bank transfers, and invoicing for Enterprise customers.",
  },
  {
    q: "Is there a free trial?",
    a: "Starter and Professional plans include a 14-day free trial — no credit card required.",
  },
  {
    q: "What happens when I exceed my AI query limit?",
    a: "On Free and Starter plans, queries are paused until the next billing cycle. You can also purchase add-on query packs.",
  },
  {
    q: "Do you offer discounts for nonprofits or startups?",
    a: "Yes — contact our sales team for special pricing programs for eligible organizations.",
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow blobs */}
      <div className="fixed top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-sky-600/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 font-medium mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Transparent pricing · No hidden fees
          </div>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Plans that scale
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
              with your team
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
            Start free, upgrade when you are ready. Every plan includes the AI
            ERP core — only the scale changes.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                !yearly
                  ? "bg-white text-black shadow-lg"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                yearly
                  ? "bg-white text-black shadow-lg"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Yearly
              <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                –20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pb-24">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
                  plan.highlighted
                    ? "border-violet-500/50 bg-gradient-to-b from-violet-950/60 to-purple-950/40 shadow-2xl shadow-violet-500/10 scale-[1.02]"
                    : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]"
                } backdrop-blur-md overflow-hidden`}
              >
                {/* Top gradient strip */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${plan.color}`}
                />

                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-violet-500 to-purple-500 text-white px-2.5 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Plan header */}
                  <div className="mb-6">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-white/40 leading-snug">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {price === null ? (
                      <div className="text-3xl font-black text-white">
                        Custom
                      </div>
                    ) : price === 0 ? (
                      <div className="text-3xl font-black text-white">Free</div>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-black text-white">
                          ${price}
                        </span>
                        <span className="text-white/40 text-sm mb-1">
                          /mo {yearly && <span className="text-emerald-400">billed yearly</span>}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={plan.href}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 mb-6 ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-400 hover:to-purple-500 shadow-lg shadow-violet-500/30"
                        : "bg-white/8 text-white/80 hover:bg-white/15 border border-white/10"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-white/8 mb-5" />

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-white/60">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="pb-24 max-w-3xl mx-auto">
          <h2
            className="text-3xl font-black text-center mb-12 text-white/90"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border border-white/8 rounded-xl bg-white/[0.03] backdrop-blur-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-sm font-semibold text-white/80 hover:text-white transition-colors">
                  {faq.q}
                  <span className="ml-4 text-white/30 group-open:rotate-45 transition-transform text-lg leading-none">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm text-white/45 leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="pb-24">
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 to-orange-950/20 backdrop-blur-sm p-10 text-center">
            <Building2 className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h3
              className="text-2xl font-black text-white mb-3"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Need a custom enterprise plan?
            </h3>
            <p className="text-white/50 mb-6 max-w-md mx-auto text-sm">
              Dedicated infrastructure, custom SLAs, on-premise options, and a
              success team built around your organization.
            </p>
            <Link
              href="/contact?plan=enterprise"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-sm transition-all"
            >
              Talk to sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}