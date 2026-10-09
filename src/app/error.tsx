// src/app/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime errors for telemetry
    console.error("Global Error Boundary caught an exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm text-center space-y-6">
        {/* Error Warning Badge */}
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-200/60 shadow-inner">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-full">
            Application Error Boundary
          </span>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            Something went wrong
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            An unexpected error occurred while executing this operation. You can try recovering the session or return home.
          </p>
        </div>

        {/* Optional Error Trace Info */}
        {error.message && (
          <div className="p-3 bg-zinc-50 border border-zinc-200/70 rounded-xl text-left">
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
              Error Message
            </p>
            <p className="text-xs font-mono text-rose-600 break-words line-clamp-3">
              {error.message}
            </p>
          </div>
        )}

        {/* Recovery Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            Try Again (Recover)
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}