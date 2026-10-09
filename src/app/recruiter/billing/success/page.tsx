// src/app/recruiter/billing/success/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trxId = searchParams.get("trxId");

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm text-center space-y-6">
        {/* Animated Success Check Icon */}
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200/60 shadow-inner">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title and Confirmation */}
        <div className="space-y-1.5">
          <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            Payment Verified
          </span>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 mt-2">
            Payment Successful!
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Your bKash transaction has been verified and assessment credits have been added to your recruiter balance.
          </p>
        </div>

        {/* Transaction Details Box */}
        {trxId && (
          <div className="bg-zinc-50 border border-zinc-200/70 rounded-2xl p-4 text-left space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500">Gateway</span>
              <span className="font-semibold text-zinc-900">bKash Checkout</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500">Status</span>
              <span className="font-medium text-emerald-600">COMPLETED</span>
            </div>
            <div className="border-t border-zinc-200/60 pt-2 flex justify-between items-center text-xs">
              <span className="text-zinc-500">Transaction ID</span>
              <span className="font-mono font-medium text-zinc-800 bg-white px-2 py-0.5 rounded border border-zinc-200">
                {trxId}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Link
            href="/recruiter"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            Go to Recruiter Dashboard
          </Link>

          <button
            type="button"
            onClick={() => router.push("/recruiter/billing")}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer"
          >
            View Billing & History
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}