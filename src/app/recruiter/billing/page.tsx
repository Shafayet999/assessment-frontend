// src/app/recruiter/billing/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface PaymentHistoryItem {
  id: string;
  amount: number;
  creditsPurchased: number;
  currency: string;
  paymentGateway: string;
  transactionId?: string | null;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  createdAt: string;
}

const CREDIT_PACKAGES = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 5,
    amount: 500,
    description: "Ideal for small teams. Evaluate up to 5 candidates.",
    badge: null,
  },
  {
    id: "growth",
    name: "Growth Pack",
    credits: 15,
    amount: 1350,
    description: "Most popular choice. Assess up to 15 candidates.",
    badge: "Popular (Save 10%)",
  },
  {
    id: "enterprise",
    name: "Scale Pack",
    credits: 30,
    amount: 2400,
    description: "Best for high-volume recruitment drives. Maximum savings with 30 credits.",
    badge: "Best Value (Save 20%)",
  },
];

function BillingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paymentStatus = searchParams.get("status");
  const trxId = searchParams.get("trxId");
  const errorMessage = searchParams.get("message");

  const [selectedPackage, setSelectedPackage] = useState(CREDIT_PACKAGES[1]);
  const [payments, setPayments] = useState<PaymentHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [paying, setPaying] = useState(false);
  const [actionError, setActionError] = useState("");

  // Fetch payment history
  useEffect(() => {
    async function loadHistory() {
      try {
        setLoadingHistory(true);
        const res = await fetchClient("/payments/my-history");
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setPayments(list);
      } catch (err: unknown) {
        console.error("Failed to load payments history", err);
      } finally {
        setLoadingHistory(false);
      }
    }

    loadHistory();
  }, []);

  // Initiate bKash payment
  const handleInitiatePayment = async () => {
    try {
      setPaying(true);
      setActionError("");

      const payload = {
        amount: selectedPackage.amount,
        creditsPurchased: selectedPackage.credits,
      };

      const res = await fetchClient("/payments/initiate", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const responseData = res?.data || res;
      const bkashURL = responseData?.bkashURL;

      if (bkashURL) {
        window.location.href = bkashURL;
      } else {
        throw new Error("bKash payment gateway URL not received.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setActionError(err.message);
      } else {
        setActionError("Failed to initiate payment. Please try again.");
      }
      setPaying(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Billing & Assessment Credits
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Purchase candidate invitation credits securely using bKash Tokenized Checkout
          </p>
        </div>
        <Link
          href="/recruiter"
          className="px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer w-fit"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Payment Callback Status Banners */}
      {paymentStatus === "success" && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center justify-between gap-3 shadow-sm animate-in fade-in">
          <div>
            <p className="font-semibold text-sm">Payment Successful! 🎉</p>
            <p className="text-emerald-700 mt-0.5">
              Your credits have been added to your account. Transaction ID:{" "}
              <span className="font-mono font-medium">{trxId}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.replace("/recruiter/billing")}
            className="text-xs font-semibold px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg transition cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {(paymentStatus === "cancel" || paymentStatus === "failure" || paymentStatus === "error") && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs flex items-center justify-between gap-3 shadow-sm">
          <div>
            <p className="font-semibold text-sm">Payment Was Not Completed</p>
            <p className="text-red-700 mt-0.5">
              {errorMessage ||
                (paymentStatus === "cancel"
                  ? "You cancelled the bKash checkout process."
                  : "Payment processing failed during the transaction.")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.replace("/recruiter/billing")}
            className="text-xs font-semibold px-3 py-1 bg-red-100 hover:bg-red-200 text-red-900 rounded-lg transition cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {actionError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
          {actionError}
        </div>
      )}

      {/* Credit Packages Grid */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-900 mb-3">Choose Credit Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CREDIT_PACKAGES.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            return (
              <button
                type="button"
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`w-full text-left relative p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-pink-500 bg-pink-50/20 shadow-md ring-2 ring-pink-500/20"
                    : "border-zinc-200/80 bg-white hover:border-zinc-300 hover:shadow-sm"
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-pink-600 text-white text-[10px] font-semibold rounded-full shadow-sm">
                    {pkg.badge}
                  </span>
                )}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-zinc-900">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-zinc-900">৳{pkg.amount}</span>
                    <span className="text-xs text-zinc-400">/ {pkg.credits} Credits</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{pkg.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Checkout Action Card */}
      <div className="p-6 bg-white border border-zinc-200/80 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="text-xs text-zinc-500">Selected Package</p>
          <p className="text-base font-semibold text-zinc-900">
            {selectedPackage.name} •{" "}
            <span className="text-pink-600 font-bold">
              {selectedPackage.credits} Credits for ৳{selectedPackage.amount}
            </span>
          </p>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            1 Credit = 1 Candidate assessment invitation
          </p>
        </div>

        <button
          type="button"
          onClick={handleInitiatePayment}
          disabled={paying}
          className="w-full sm:w-auto px-6 py-3 bg-[#E2136E] hover:bg-[#c20f5e] text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {paying ? (
            <span>Connecting bKash...</span>
          ) : (
            <>
              <span>Pay ৳{selectedPackage.amount} with</span>
              <span className="font-bold tracking-wider">bKash</span>
            </>
          )}
        </button>
      </div>

      {/* Payment History Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-900">Payment History</h2>
        <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden">
          {loadingHistory ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-zinc-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : payments.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-400">
              No previous payments recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-zinc-500 font-medium">
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Transaction ID</th>
                    <th className="p-3.5">Credits</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Gateway</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50/50 transition">
                      <td className="p-3.5 text-zinc-600">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3.5 font-mono text-zinc-800">
                        {p.transactionId || "—"}
                      </td>
                      <td className="p-3.5 font-semibold text-zinc-900">
                        +{p.creditsPurchased}
                      </td>
                      <td className="p-3.5 font-medium text-zinc-800">
                        ৳{p.amount}
                      </td>
                      <td className="p-3.5 text-zinc-500">{p.paymentGateway}</td>
                      <td className="p-3.5 text-right">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            p.status === "COMPLETED"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : p.status === "PENDING"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecruiterBillingPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 max-w-5xl mx-auto">
          <div className="h-40 bg-zinc-100 rounded-2xl animate-pulse" />
        </div>
      }
    >
      <BillingContent />
    </Suspense>
  );
}