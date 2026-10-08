// src/app/payment/success/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Candidate Pro";
  const amount = searchParams.get("amount") || "19";
  const trxId = searchParams.get("trxId") || `TRX-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-zinc-50/60 flex items-center justify-center p-4 antialiased text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="w-full max-w-md bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center space-y-6">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 font-bold text-2xl mx-auto shadow-sm">
          ✓
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            Payment Verified
          </span>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 mt-2">
            Subscription Confirmed!
          </h1>
          <p className="text-xs text-zinc-500">
            Thank you. Your assessment privileges have been activated immediately.
          </p>
        </div>

        {/* Invoice Receipt Box */}
        <div className="bg-zinc-50/60 border border-zinc-200/70 rounded-xl p-4 text-left space-y-2.5 text-xs">
          <div className="flex justify-between">
            <span className="text-zinc-500">Plan Tier:</span>
            <span className="font-semibold text-zinc-800">{plan}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Amount Paid:</span>
            <span className="font-semibold text-zinc-800">${amount} USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Transaction ID:</span>
            <span className="font-mono text-zinc-700 text-[11px]">{trxId}</span>
          </div>
          <div className="flex justify-between border-t border-zinc-200/60 pt-2">
            <span className="text-zinc-500">Status:</span>
            <span className="text-emerald-600 font-semibold text-[11px]">Completed (Live Test)</span>
          </div>
        </div>

        {/* Return Button */}
        <div className="pt-2">
          <Link
            href="/dashboard"
            className="block w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99]"
          >
            Go to Your Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-64 w-80 bg-zinc-100 rounded-2xl animate-pulse" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}