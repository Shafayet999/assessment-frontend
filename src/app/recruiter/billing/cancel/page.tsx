// src/app/recruiter/billing/cancel/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function CancelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const reason = searchParams.get("reason") || "cancelled";
  const message = searchParams.get("message");

  const isUserCancel = reason === "cancel" || reason === "cancelled";

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm text-center space-y-6">
        {/* Warning / Cancel Icon */}
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200/60 shadow-inner">
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

        {/* Title and Message */}
        <div className="space-y-1.5">
          <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
            Checkout Incomplete
          </span>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 mt-2">
            {isUserCancel ? "Payment Cancelled" : "Payment Incomplete"}
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {message ||
              (isUserCancel
                ? "You have cancelled the bKash checkout process. No amount was deducted from your account."
                : "The transaction could not be processed at this time. Please check your account details and try again.")}
          </p>
        </div>

        {/* Reassurance Info Note */}
        <div className="p-3.5 bg-zinc-50 border border-zinc-200/60 rounded-xl text-[11px] text-zinc-500 text-left flex items-start gap-2.5">
          <span className="text-zinc-400 font-bold">ℹ</span>
          <span>
            If any balance was deducted unexpectedly, it will be refunded automatically by bKash according to their standard policy.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={() => router.push("/recruiter/billing")}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#E2136E] hover:bg-[#c20f5e] text-white rounded-xl text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            Try Payment Again
          </button>

          <Link
            href="/recruiter"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
        </div>
      }
    >
      <CancelContent />
    </Suspense>
  );
}