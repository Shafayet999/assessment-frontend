// src/app/about/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DevAssess | Technical Assessment & Benchmarking Platform",
  description:
    "Learn about DevAssess, our fullstack evaluation architecture, engineering philosophy, and mission to deliver transparent developer screening.",
};

const TECH_STACK = [
  {
    category: "Frontend Framework",
    tech: "Next.js (App Router)",
    role: "Server-first rendering, layout hierarchy, and optimized client interactivity.",
  },
  {
    category: "Type Safety",
    tech: "TypeScript",
    role: "Strict interfaces across API payloads, database models, and component props.",
  },
  {
    category: "Styling & System",
    tech: "Tailwind CSS",
    role: "Modern, responsive, utility-first UI designed for mobile, tablet, and desktop.",
  },
  {
    category: "Database & ORM",
    tech: "Prisma ORM",
    role: "Type-safe database transactions for atomic credit increments and test scoring.",
  },
  {
    category: "Payment Gateway",
    tech: "bKash Tokenized Checkout (Sandbox)",
    role: "Automated credit purchase, callback verification, and administrative refund API.",
  },
  {
    category: "State & Data Fetching",
    tech: "Server Components & TanStack SWR",
    role: "Low latency, fast SSR data resolution with clean client-side loading states.",
  },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Deterministic Grading",
    description:
      "Every candidate evaluation is computed directly against structured answer keys inside database transactions, guaranteeing 100% fair and tamper-proof grading.",
  },
  {
    number: "02",
    title: "Zero-Overhead Recruitment",
    description:
      "Recruiters bypass tedious manual questionnaire tracking. From authoring questions to issuing invitation tokens, pipelines operate in a unified dashboard.",
  },
  {
    number: "03",
    title: "Enterprise Governance & Auditability",
    description:
      "All credit purchases, wallet executions, and candidate status updates write immutable records to the system audit log with full JSON payloads.",
  },
];

export default function AboutPage() {
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
            <Link href="/about" className="text-zinc-950 font-semibold transition">About</Link>
            <Link href="/features" className="hover:text-zinc-900 transition">Features</Link>
            <Link href="/pricing" className="hover:text-zinc-900 transition">Pricing & Credits</Link>
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-semibold text-zinc-700 mb-6 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Fullstack Assessment Engineering
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
          Redefining Technical Recruitment with Architectural Precision
        </h1>
        <p className="mt-4 text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          DevAssess is an automated skill benchmarking and assessment platform designed to eliminate friction in developer hiring. Built with modern Next.js App Router and tokenized payment architectures.
        </p>
      </section>

      {/* Platform Mission & Story */}
      <section className="px-6 max-w-5xl mx-auto w-full pb-16">
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-12 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900">
              The Problem We Solve
            </h2>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed mt-3">
              Traditional recruitment pipelines suffer from slow feedback loops, fragmented testing spreadsheets, and lack of real-time integrity verification. Candidates wait days for test results, while recruiters struggle to balance screening costs against pipeline volume.
            </p>
          </div>

          <div className="border-t border-zinc-100 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-zinc-900">For Hiring Teams & Recruiters</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Empowers recruiters to create question banks, assemble customized evaluation rounds with specific pass marks, and purchase pay-as-you-go candidate evaluation credits through instant bKash checkout.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-zinc-900">For Software Engineering Candidates</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Provides a clean, distraction-free examination screen equipped with an automated countdown timer, zero setup friction, and instantaneous verified scoring upon submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Principles Grid */}
      <section className="py-16 px-6 bg-zinc-100/60 border-y border-zinc-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              Core Architectural Pillars
            </h2>
            <p className="text-xs text-zinc-500 mt-2">
              The fundamental engineering tenets governing the design of DevAssess.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-2xs space-y-3"
              >
                <span className="font-mono text-2xl font-black text-zinc-300">
                  {item.number}
                </span>
                <h3 className="text-base font-bold text-zinc-900">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Powered by Modern Technologies
          </h2>
          <p className="text-xs text-zinc-500 mt-2">
            Engineered using modern full-stack web standards for peak performance, security, and type safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_STACK.map((item) => (
            <div
              key={item.tech}
              className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-2xs space-y-1.5"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                {item.category}
              </span>
              <h3 className="text-sm font-bold text-zinc-900">{item.tech}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{item.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20 max-w-4xl mx-auto text-center space-y-6">
        <div className="bg-zinc-950 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Ready to explore the platform?
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 max-w-lg mx-auto">
            Test the live system right away using our One-Click Demo login buttons for Admin, Recruiter, and Candidate roles.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-semibold rounded-xl shadow-md transition"
            >
              Explore With 1-Click Demo Login →
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
            <Link href="/about" className="hover:text-zinc-900 transition text-zinc-950 font-semibold">About</Link>
            <Link href="/features" className="hover:text-zinc-900 transition">Features</Link>
            <Link href="/pricing" className="hover:text-zinc-900 transition">Pricing</Link>
            <Link href="/contact" className="hover:text-zinc-900 transition">Contact</Link>
            <Link href="/login" className="hover:text-zinc-900 transition font-medium text-zinc-800">1-Click Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}