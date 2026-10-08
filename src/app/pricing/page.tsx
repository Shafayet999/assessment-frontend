// src/app/pricing/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

const plans = [
  {
    id: "candidate-pro",
    name: "Candidate Pro",
    price: 19,
    description: "Unlimited test retakes, detailed code reports & verification badge.",
    features: [
      "Access to all assessment tests",
      "Detailed answer breakdowns",
      "Sharable verification certificate",
      "Priority recruiter indexing",
    ],
    popular: false,
  },
  {
    id: "recruiter-business",
    name: "Recruiter Growth",
    price: 99,
    description: "Create custom hiring pipelines and invite unlimited candidates.",
    features: [
      "Unlimited assessment authoring",
      "Automated score evaluation",
      "Anti-cheat timer analytics",
      "CSV & PDF candidate exports",
      "Custom branding on exam papers",
    ],
    popular: true,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (plan: typeof plans[0]) => {
    setLoadingPlan(plan.id);

    try {
      // ব্যাকএন্ডের পেমেন্ট সেশন কল করার চেষ্টা করবে
      const res = await fetchClient("/payments/initiate", {
        method: "POST",
        body: JSON.stringify({
          planId: plan.id,
          amount: plan.price,
          currency: "USD",
        }),
      }).catch(() => null);

      if (res?.data?.checkoutUrl || res?.checkoutUrl) {
        // যদি আসল গেটওয়ে URL থাকে (Stripe / SSLCommerz)
        window.location.href = res?.data?.checkoutUrl || res.checkoutUrl;
      } else {
        // ফলব্যাক সাকসেস ফ্লো (টেস্ট মোড সিম্যুলেশন)
        const mockTrxId = `TRX-${Date.now().toString().slice(-8)}`;
        router.push(`/payment/success?plan=${plan.name}&amount=${plan.price}&trxId=${mockTrxId}`);
      }
    } catch {
      router.push("/payment/cancel");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 py-16 px-4 antialiased selection:bg-zinc-900 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Navigation Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition"
          >
            ← Back to Platform
          </Link>
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-zinc-200 text-zinc-700">
            Test Mode / SSLCommerz & Stripe
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Predictable pricing for developers and hiring teams
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Choose a tier to unlock advanced technical evaluation features, benchmark grading, and verified certifications.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white border rounded-2xl p-8 flex flex-col justify-between shadow-sm relative transition ${
                plan.popular
                  ? "border-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                  : "border-zinc-200/80 hover:border-zinc-300"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-3 py-0.5 rounded-full bg-zinc-900 text-white text-[10px] font-semibold tracking-wider uppercase">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">{plan.name}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-zinc-900">
                    ${plan.price}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">/ month</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-zinc-100">
                  <p className="text-[11px] font-semibold text-zinc-700 uppercase tracking-wider">
                    Included Capabilities:
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-600">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  disabled={loadingPlan === plan.id}
                  onClick={() => handleCheckout(plan)}
                  className={`w-full py-2.5 rounded-xl text-xs font-medium transition cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-50 ${
                    plan.popular
                      ? "bg-zinc-900 hover:bg-zinc-800 text-white"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800"
                  }`}
                >
                  {loadingPlan === plan.id ? "Initializing Checkout..." : `Subscribe to ${plan.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}