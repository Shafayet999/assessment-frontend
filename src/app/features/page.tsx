// src/app/features/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features & Capabilities | DevAssess",
  description:
    "Explore the technical architecture, automated evaluation engine, anti-tamper exam environment, and bKash credit billing of DevAssess.",
};

const CORE_CAPABILITIES = [
  {
    id: "automated-eval",
    title: "Deterministic Auto-Evaluation Engine",
    category: "Evaluation Engine",
    description:
      "Instantaneous grading pipeline executing inside Prisma database transactions. Eliminates manual assessment review delays for recruiters.",
    details: [
      "Sub-second MCQ response validation against hashed answers",
      "Transactional score computation preventing partial submission states",
      "Deterministic pass/fail threshold calculation against configurable benchmarks",
      "Immediate candidate scorecard generation post-submission",
    ],
  },
  {
    id: "exam-environment",
    title: "Anti-Tamper Timed Testing Suite",
    category: "Candidate Experience",
    description:
      "Streamlined candidate assessment interface with real-time countdown timer tracking and strict attempt enforcement.",
    details: [
      "StartedAt and DurationMinutes synchronization on the backend",
      "Duplicate submission protection with transactional upsert guards",
      "Secure payload stripping ensuring answers are never leaked to client bundles",
      "Zero registration friction via unique recruiter email invitations",
    ],
  },
  {
    id: "recruiter-pipeline",
    title: "Custom Test Authoring & Question Pool",
    category: "Recruiter Console",
    description:
      "End-to-end recruiter workspace to draft technical questions, assemble custom duration assessments, and track applicant batches.",
    details: [
      "Custom question authoring with customizable marks and difficulty",
      "Modular test packaging configuring pass mark ratios (e.g. 40% benchmark)",
      "Applicant invitation pipeline tracking: Invited, In-Progress, and Submitted",
      "Batch candidate progress inspection and score comparisons",
    ],
  },
  {
    id: "tokenized-billing",
    title: "bKash Tokenized Credit Ledger",
    category: "Payment Integration",
    description:
      "Direct integration with bKash Sandbox Tokenized Checkout API v2, allowing instant top-ups of assessment invitation credits.",
    details: [
      "Zero-overhead payment initiation with dynamic invoice generation",
      "Server-to-server execute webhook ensuring secure credit balance increment",
      "Automatic redirect handling to dedicated Success and Cancel status pages",
      "Integrated administrator refund mechanism with automated credit adjustments",
    ],
  },
  {
    id: "system-audit",
    title: "Immutable Enterprise Audit Trails",
    category: "Governance & Security",
    description:
      "Comprehensive system-wide audit logging tracking all sensitive operations, financial transitions, and administrative overrides.",
    details: [
      "Payload-level JSON audit logs for credit purchases and refund transactions",
      "Admin inspection modal with JSON viewer for verifying transaction metadata",
      "Recruiter and candidate account lifecycle control (Active/Blocked toggling)",
      "Role-based API authorization guards (Admin, Recruiter, Candidate)",
    ],
  },
  {
    id: "modern-architecture",
    title: "Next.js App Router & Microservices Ready",
    category: "Technology Stack",
    description:
      "Built on modern enterprise standards combining Server Component speed with dynamic client interaction.",
    details: [
      "Server-first rendering with static prerendering and edge caching",
      "Accessible, mobile-responsive layout built with Tailwind CSS",
      "Strict TypeScript typing across all backend models and frontend payloads",
      "One-click multi-role demo authentication for seamless evaluation",
    ],
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Create Assessment",
    role: "Recruiter",
    description: "Build custom technical evaluation tests and set duration and pass mark criteria.",
  },
  {
    step: "02",
    title: "Top Up Credits",
    role: "Recruiter",
    description: "Purchase candidate evaluation credits securely using the bKash Tokenized Checkout.",
  },
  {
    step: "03",
    title: "Invite Candidates",
    role: "Recruiter",
    description: "Send invitation tokens directly to candidate email addresses from the pipeline.",
  },
  {
    step: "04",
    title: "Complete Exam",
    role: "Candidate",
    description: "Candidates log in, take the timed assessment, and submit their responses.",
  },
  {
    step: "05",
    title: "Automated Results",
    role: "Candidate & Recruiter",
    description: "Instant grading produces candidate scorecards and updates recruiter benchmarks.",
  },
];

export default function FeaturesPage() {
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
            <Link href="/features" className="text-zinc-950 font-semibold transition">Features</Link>
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-[11px] font-semibold text-indigo-700 mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          Technical Specifications & Capabilities
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
          Enterprise Architecture Built for Hiring Integrity
        </h1>
        <p className="mt-4 text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          From transactional auto-grading algorithms to tokenized fintech checkouts, 
          discover how DevAssess powers modern engineering recruitment pipelines.
        </p>
      </section>

      {/* Capabilities Grid */}
      <section className="px-6 max-w-6xl mx-auto w-full pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm hover:border-zinc-300 transition flex flex-col justify-between"
            >
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-full">
                  {cap.category}
                </span>

                <h3 className="text-base font-bold text-zinc-900 mt-3">
                  {cap.title}
                </h3>

                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  {cap.description}
                </p>

                <div className="mt-5 pt-5 border-t border-zinc-100">
                  <p className="text-[11px] font-semibold text-zinc-800 uppercase tracking-wider mb-2.5">
                    Key Specifications
                  </p>
                  <ul className="space-y-2">
                    {cap.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-xs text-zinc-600">
                        <svg
                          className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* End-to-End Workflow Process */}
      <section className="py-20 px-6 bg-zinc-100/60 border-y border-zinc-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              The End-to-End Assessment Lifecycle
            </h2>
            <p className="text-xs text-zinc-500 mt-2">
              Five clear operational stages orchestrated seamlessly between Recruiters and Candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {WORKFLOW_STEPS.map((wf) => (
              <div
                key={wf.step}
                className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs space-y-3 relative"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xl font-extrabold text-zinc-300">
                    {wf.step}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded">
                    {wf.role}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900">{wf.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{wf.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">
          Experience the platform in action
        </h2>
        <p className="text-xs md:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
          Log in with preconfigured demo accounts for Admin, Recruiter, and Candidate to test the entire evaluation pipeline live.
        </p>
        <div>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl shadow-md transition"
          >
            Launch 1-Click Demo Login →
          </Link>
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
            <Link href="/features" className="hover:text-zinc-900 transition text-zinc-950 font-semibold">Features</Link>
            <Link href="/pricing" className="hover:text-zinc-900 transition">Pricing</Link>
            <Link href="/contact" className="hover:text-zinc-900 transition">Contact</Link>
            <Link href="/login" className="hover:text-zinc-900 transition font-medium text-zinc-800">1-Click Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}