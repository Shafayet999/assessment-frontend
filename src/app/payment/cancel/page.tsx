// src/app/payment/cancel/page.tsx
"use client";

import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-zinc-50/60 flex items-center justify-center p-4 antialiased text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="w-full max-w-md bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center space-y-6">
        {/* Warning Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 font-bold text-2xl mx-auto shadow-sm">
          ✕
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
            Transaction Incomplete
          </span>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 mt-2">
            Payment Cancelled
          </h1>
          <p className="text-xs text-zinc-500">
            Your transaction was not completed. No charges were made to your card or account.
          </p>
        </div>

        <div className="p-4 bg-zinc-50 border border-zinc-200/60 rounded-xl text-xs text-zinc-500 text-left">
          If you experienced an unexpected network drop or gateway timeout, you can try again safely at any time.
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/pricing"
            className="w-1/2 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium transition cursor-pointer shadow-sm text-center"
          >
            Try Again
          </Link>
          <Link
            href="/dashboard"
            className="w-1/2 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer text-center"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}