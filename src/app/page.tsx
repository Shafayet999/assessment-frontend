// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      title: "Real-Time Timed Tests",
      desc: "Live countdown timers with automated submission failsafes to guarantee fair evaluations.",
    },
    {
      title: "Granular Candidate Analytics",
      desc: "Instant automated grading, question-by-question breakdown, and verified pass/fail scorecards.",
    },
    {
      title: "Dynamic Question Builder",
      desc: "Recruiters can compose multi-choice questions with customized weightage and durations in seconds.",
    },
    {
      title: "Role Governance & Auditing",
      desc: "Granular role-based controls for Super Admins, Recruiters, and Candidates with audit traceability.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white flex flex-col justify-between">
      {/* Navigation Bar */}
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
              DEV
            </div>
            <span className="text-sm font-semibold tracking-tight">DevPlatform</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-600">
            <Link href="/" className="text-zinc-900 transition">Overview</Link>
            <Link href="/pricing" className="hover:text-zinc-900 transition">Pricing</Link>
            <Link href="/about" className="hover:text-zinc-900 transition">About</Link>
            <Link href="/contact" className="hover:text-zinc-900 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-100 rounded-xl text-xs font-medium text-zinc-700 transition"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition"
            >
              Demo Access →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-[11px] font-medium text-zinc-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Production-Ready Developer Assessments
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 max-w-3xl mx-auto leading-tight">
          Evaluate technical talent with precision and speed
        </h1>

        <p className="text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
          A high-performance assessment platform built for hiring teams to create technical tests, evaluate candidate benchmarks, and verify skills objectively.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/login"
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99]"
          >
            Launch Demo Portal
          </Link>
          <Link
            href="/pricing"
            className="px-5 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition"
          >
            View Pricing Plans
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-16">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-2 hover:border-zinc-300 transition"
            >
              <h3 className="text-sm font-semibold text-zinc-900">{feat.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 DevPlatform. Built for Technical Hiring Benchmarks.</p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-zinc-900 transition">About</Link>
            <Link href="/pricing" className="hover:text-zinc-900 transition">Pricing</Link>
            <Link href="/contact" className="hover:text-zinc-900 transition">Contact</Link>
            <Link href="/login" className="hover:text-zinc-900 transition">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}