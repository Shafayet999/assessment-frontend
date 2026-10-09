// src/app/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevAssess | Next-Gen Technical Assessment Platform",
  description:
    "Evaluate engineering talent with precision. Automated MCQ evaluations, structured candidate benchmarking, and tokenized credit billing.",
};

const FEATURES = [
  {
    title: "Real-time Automated Evaluation",
    description:
      "Instantly score candidate submissions with deterministic scoring pipelines and zero latency evaluation logic.",
    icon: (
      <svg
        className="w-6 h-6 text-emerald-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Role-Based Access & Integrity",
    description:
      "Three distinct access levels: Candidates take timed tests, Recruiters build pipelines, and Admins monitor audit logs.",
    icon: (
      <svg
        className="w-6 h-6 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    title: "bKash Tokenized Checkout",
    description:
      "Seamless credit top-ups for hiring teams via automated sandbox payment execution and instant credit updates.",
    icon: (
      <svg
        className="w-6 h-6 text-pink-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    title: "Immutable System Audit Logs",
    description:
      "Complete enterprise-grade transparency. Financial executions and status changes are recorded in audit logs.",
    icon: (
      <svg
        className="w-6 h-6 text-amber-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

const ROLES = [
  {
    role: "Candidate",
    badge: "Test Taker",
    desc: "Receive test invitations, complete time-restricted assessments, and get immediate score verification.",
    cta: "Take Assessment",
    href: "/login",
  },
  {
    role: "Recruiter",
    badge: "Hiring Team",
    desc: "Author questions, configure customized benchmarks, invite candidates, and purchase evaluation credits.",
    cta: "Hiring Portal",
    href: "/login",
  },
  {
    role: "Admin",
    badge: "System Governance",
    desc: "Manage platform users, block/unblock recruiters and candidates, and review JSON-level audit payloads.",
    cta: "Admin Console",
    href: "/login",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans">
      {/* Public Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
              DA
            </div>
            <span className="font-bold text-base tracking-tight text-zinc-900">
              DevAssess
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-600">
            <Link href="/about" className="hover:text-zinc-900 transition">
              About
            </Link>
            <Link href="/features" className="hover:text-zinc-900 transition">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-zinc-900 transition">
              Pricing & Credits
            </Link>
            <Link href="/contact" className="hover:text-zinc-900 transition">
              Contact
            </Link>
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
      <section className="py-20 md:py-28 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-semibold text-zinc-700 mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Production-Ready Technical Assessment Suite
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.15]">
          Benchmarking talent with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent">
            precision and speed.
          </span>
        </h1>

        <p className="mt-6 text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          DevAssess bridges recruiters and engineering candidates with automated evaluation pipelines, 
          instant scoring analytics, and tokenized credit management.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl shadow-md transition active:scale-95"
          >
            Explore With 1-Click Demo Login →
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold rounded-xl transition"
          >
            View Credit Packages
          </Link>
        </div>

        {/* Live Metrics Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border border-zinc-200/80 rounded-2xl p-6 bg-white shadow-sm">
          <div>
            <p className="text-2xl font-bold text-zinc-900">100%</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Automated Scoring</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900">3 Roles</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Strict Access Control</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900">bKash</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Integrated Gateway</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900">Real-time</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Audit Trail</p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-6 bg-zinc-100/60 border-y border-zinc-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              Engineered for Enterprise Assessment
            </h2>
            <p className="text-xs text-zinc-500 mt-2">
              Everything required to run reliable, tamper-free screening tests for software engineering applicants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-6 bg-white border border-zinc-200/80 rounded-2xl shadow-sm space-y-3 hover:border-zinc-300 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-zinc-900">{f.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Architecture Preview */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Tailored Experiences Across 3 Roles
          </h2>
          <p className="text-xs text-zinc-500 mt-2">
            Test each workflow instantly using our built-in one-click demo authentication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROLES.map((r) => (
            <div
              key={r.role}
              className="p-6 bg-white border border-zinc-200/80 rounded-2xl shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-md">
                  {r.badge}
                </span>
                <h3 className="text-base font-bold text-zinc-900">{r.role}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{r.desc}</p>
              </div>

              <Link
                href={r.href}
                className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl text-center shadow-xs transition"
              >
                {r.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
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
            <Link href="/about" className="hover:text-zinc-900 transition">
              About
            </Link>
            <Link href="/features" className="hover:text-zinc-900 transition">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-zinc-900 transition">
              Pricing
            </Link>
            <Link href="/contact" className="hover:text-zinc-900 transition">
              Contact
            </Link>
            <Link
              href="/login"
              className="hover:text-zinc-900 transition font-medium text-zinc-800"
            >
              1-Click Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}