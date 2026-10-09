// src/app/pricing/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Assessment Credits | DevAssess",
  description:
    "Predictable pay-as-you-go credit tiers for engineering candidate assessments. Integrated with secure bKash Tokenized Checkout.",
};

const PACKAGES = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 5,
    amount: 500,
    unitPrice: 100,
    badge: null,
    highlight: false,
    description: "Designed for early-stage teams hiring for specific key positions.",
    features: [
      "5 Candidate evaluation invites",
      "Full automated MCQ auto-evaluation",
      "Detailed candidate performance breakdown",
      "Standard email delivery pipeline",
      "Valid for 180 days",
    ],
  },
  {
    id: "growth",
    name: "Growth Pack",
    credits: 15,
    amount: 1350,
    unitPrice: 90,
    badge: "Most Popular (Save 10%)",
    highlight: true,
    description: "Ideal for scaling engineering departments with regular interview rounds.",
    features: [
      "15 Candidate evaluation invites",
      "Full automated MCQ auto-evaluation",
      "Comprehensive scoring analytics",
      "Custom assessment duration & pass marks",
      "Priority candidate invite delivery",
      "Valid for 365 days",
    ],
  },
  {
    id: "enterprise",
    name: "Scale Pack",
    credits: 30,
    amount: 2400,
    unitPrice: 80,
    badge: "Best Value (Save 20%)",
    highlight: false,
    description: "Built for high-volume campus hiring and mass screening drives.",
    features: [
      "30 Candidate evaluation invites",
      "Full automated MCQ auto-evaluation",
      "Exportable assessment performance data",
      "Dedicated candidate pipeline filtering",
      "Immutable system audit log tracking",
      "Lifetime credit validity",
    ],
  },
];

const FAQS = [
  {
    q: "How does the assessment credit system work?",
    a: "1 Credit equals 1 Candidate test invitation. When a recruiter invites a candidate via their email address, 1 credit is deducted from their balance. Candidate test attempts, scoring, and report generation incur no extra fee.",
  },
  {
    q: "How does bKash Tokenized Checkout process payments?",
    a: "We utilize bKash's official Tokenized Checkout API. When initiating payment, you are securely redirected to the official bKash gateway to verify your wallet via OTP and PIN. Credits are credited to your balance via atomic database transactions.",
  },
  {
    q: "Can I test the payment without real money?",
    a: "Yes. The platform operates on the official bKash Sandbox Environment. Recruiters can test checkouts using test credentials and sandbox simulator wallets without real financial charges.",
  },
  {
    q: "Are credit purchases refundable?",
    a: "Unused credits can be refunded by system administrators via our integrated bKash Refund API. Once initiated, the transaction amount is credited back to the originating bKash wallet.",
  },
  {
    q: "Do purchased assessment credits expire?",
    a: "Depending on your selected tier, credits remain valid between 6 months to lifetime. Unused credits roll over whenever you purchase any new credit package.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans">
      {/* Public Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
              DA
            </div>
            <span className="font-bold text-base tracking-tight text-zinc-900">DevAssess</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-600">
            <Link href="/about" className="hover:text-zinc-900 transition">About</Link>
            <Link href="/features" className="hover:text-zinc-900 transition">Features</Link>
            <Link href="/pricing" className="text-zinc-950 font-semibold transition">Pricing & Credits</Link>
            <Link href="/contact" className="hover:text-zinc-900 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 transition"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl shadow-sm transition active:scale-95"
            >
              1-Click Demo Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-[11px] font-semibold text-pink-700 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#E2136E] animate-pulse" />
          Official bKash Tokenized Checkout Integration
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
          Simple, Transparent Credit Packages
        </h1>
        <p className="mt-4 text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Pay only for candidates you evaluate. No monthly lock-ins, no hidden subscription tiers.
          Top up candidate invite credits whenever your hiring pipeline demands.
        </p>
      </section>

      {/* Pricing Cards Grid */}
      <section className="px-6 max-w-6xl mx-auto w-full pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl p-8 flex flex-col justify-between transition-all ${
                pkg.highlight
                  ? "border-2 border-pink-500 shadow-xl ring-4 ring-pink-500/10"
                  : "border border-zinc-200/80 shadow-sm hover:border-zinc-300"
              }`}
            >
              {pkg.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#E2136E] text-white text-[11px] font-semibold rounded-full shadow-sm whitespace-nowrap">
                  {pkg.badge}
                </span>
              )}

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">{pkg.name}</h3>
                    <p className="text-xs text-zinc-500 mt-1">{pkg.description}</p>
                  </div>
                </div>

                <div className="mt-6 pb-6 border-b border-zinc-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-extrabold text-zinc-950">৳{pkg.amount}</span>
                    <span className="text-xs text-zinc-500">/ BDT</span>
                  </div>
                  <p className="text-xs text-pink-600 font-semibold mt-1">
                    {pkg.credits} Credits (৳{pkg.unitPrice} per evaluation)
                  </p>
                </div>

                <ul className="mt-6 space-y-3">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-600">
                      <svg
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100">
                <Link
                  href="/login"
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold text-center block transition cursor-pointer shadow-sm ${
                    pkg.highlight
                      ? "bg-[#E2136E] hover:bg-[#c20f5e] text-white"
                      : "bg-zinc-900 hover:bg-zinc-800 text-white"
                  }`}
                >
                  Purchase via bKash →
                </Link>
                <p className="text-[10px] text-center text-zinc-400 mt-2">
                  Instant balance update via sandbox gateway
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evaluation Value Breakdown */}
      <section className="py-16 px-6 bg-zinc-100/60 border-y border-zinc-200/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              What Does 1 Assessment Credit Cover?
            </h2>
            <p className="text-xs text-zinc-500 mt-2">
              Every candidate invitation unlocked by a credit provides the complete testing lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-2xs">
              <span className="text-xs font-mono font-bold text-zinc-400">01</span>
              <h4 className="text-sm font-semibold text-zinc-900 mt-2">Candidate Invitation</h4>
              <p className="text-xs text-zinc-500 mt-1">Unique assessment access token tied to candidate email.</p>
            </div>
            <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-2xs">
              <span className="text-xs font-mono font-bold text-zinc-400">02</span>
              <h4 className="text-sm font-semibold text-zinc-900 mt-2">Timed Assessment</h4>
              <p className="text-xs text-zinc-500 mt-1">Automated countdown timer, zero-tamper question presentation.</p>
            </div>
            <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-2xs">
              <span className="text-xs font-mono font-bold text-zinc-400">03</span>
              <h4 className="text-sm font-semibold text-zinc-900 mt-2">Automated Grading</h4>
              <p className="text-xs text-zinc-500 mt-1">Deterministic Prisma scoring transaction upon test submission.</p>
            </div>
            <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-2xs">
              <span className="text-xs font-mono font-bold text-zinc-400">04</span>
              <h4 className="text-sm font-semibold text-zinc-900 mt-2">Scorecard & Pipeline</h4>
              <p className="text-xs text-zinc-500 mt-1">Instant pass/fail benchmark updates in recruiter console.</p>
            </div>
          </div>
        </div>
      </section>

      {/* bKash FAQ Accordion Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-zinc-500 mt-2">
            Details regarding bKash checkout, credits, and candidate invitations.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              className="p-6 bg-white border border-zinc-200/80 rounded-2xl shadow-2xs space-y-2"
            >
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <span className="text-pink-600 font-mono text-xs">Q.</span>
                {faq.q}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="px-6 pb-20 max-w-5xl mx-auto w-full">
        <div className="bg-zinc-950 text-white rounded-3xl p-8 md:p-12 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Ready to test candidate technical capabilities?
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 max-w-xl mx-auto">
            Log in with the One-Click Demo Recruiter account to test package purchasing and credit consumption.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-semibold rounded-xl shadow-md transition"
            >
              Launch Recruiter Console →
            </Link>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="mt-auto border-t border-zinc-200/80 bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-zinc-900 text-white flex items-center justify-center font-bold text-[10px]">
              DA
            </div>
            <span className="font-semibold text-zinc-800">DevAssess Platform</span>
            <span>© 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-zinc-900 transition">About</Link>
            <Link href="/features" className="hover:text-zinc-900 transition">Features</Link>
            <Link href="/pricing" className="hover:text-zinc-900 transition text-zinc-950 font-semibold">Pricing</Link>
            <Link href="/contact" className="hover:text-zinc-900 transition">Contact</Link>
            <Link href="/login" className="hover:text-zinc-900 transition font-medium text-zinc-800">1-Click Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}