// src/app/not-found.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | DevAssess",
  description: "The page you are looking for does not exist on DevAssess.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="border-b border-zinc-200/80 bg-white px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
            DA
          </div>
          <span className="font-bold text-base tracking-tight text-zinc-900">
            DevAssess
          </span>
        </Link>
        <Link
          href="/login"
          className="text-xs font-semibold px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl transition"
        >
          Sign In
        </Link>
      </header>

      {/* 404 Main Body */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-zinc-100 text-zinc-800 rounded-2xl flex items-center justify-center mx-auto border border-zinc-200 shadow-inner">
            <span className="font-mono text-xl font-extrabold text-zinc-700">
              404
            </span>
          </div>

          <div className="space-y-2">
            <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-full">
              Route Not Found
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              Page Doesn't Exist
            </h1>
            <p className="text-xs text-zinc-500 leading-relaxed">
              The requested assessment URL, dashboard route, or verification link may have moved or no longer exists.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold shadow-sm transition"
            >
              ← Back to Homepage
            </Link>

            <Link
              href="/recruiter"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer"
            >
              Go to Recruiter Dashboard
            </Link>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-zinc-200/80 bg-white py-6 text-center text-xs text-zinc-400">
        DevAssess Assessment Platform • © 2026
      </footer>
    </div>
  );
}