// src/app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  const pillars = [
    {
      label: "Zero Bias",
      content: "Automated standard scoring engines that evaluate answers without demographic bias.",
    },
    {
      label: "Anti-Cheating Safeguards",
      content: "Deterministic time boundaries with client and server synced clocks to prevent unauthorized extensions.",
    },
    {
      label: "Instant Verification",
      content: "Candidates and hiring teams receive cryptographic results and verifiable transcripts immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 py-16 px-6 antialiased selection:bg-zinc-900 selection:text-white flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition">
            ← Back to Home
          </Link>
          <Link
            href="/login"
            className="px-3 py-1.5 bg-zinc-900 text-white rounded-xl text-xs font-medium"
          >
            Access Platform
          </Link>
        </div>

        <div className="space-y-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            About Our Mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            Standardizing technical assessments for modern development teams
          </h1>
          <p className="text-xs text-zinc-600 leading-relaxed max-w-2xl">
            DevPlatform was engineered to bridge the gap between candidate ability and employer expectations. We eliminate arbitrary interview stages with verifiable, standardized technical assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-2"
            >
              <h2 className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">
                {p.label}
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed">{p.content}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-zinc-900">Platform Architecture</h2>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Engineered with Next.js App Router for low latency, Tailwind CSS and shadcn/ui for clean typography, and a stateless tokenized backend supporting role-based access for Super Admins, Recruiters, and Candidates.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full pt-16 text-center text-xs text-zinc-400">
        © 2026 DevPlatform Systems. All rights reserved.
      </div>
    </div>
  );
}