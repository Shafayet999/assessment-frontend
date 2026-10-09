// src/app/dashboard/results/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface SubmissionItem {
  id?: string;
  questionId?: string;
  answerText: string;
  obtainedMarks?: number;
  isEvaluated?: boolean;
  isCorrect?: boolean;
  question?: {
    id?: string;
    title: string;
    type?: string;
    marks?: number;
    correctAnswer?: string;
  };
}

interface SubmissionResult {
  id: string;
  totalScore?: number;
  score?: number;
  totalMarks?: number;
  passMarks?: number;
  status: string;
  submittedAt?: string;
  createdAt?: string;
  assessment?: {
    id: string;
    title: string;
    totalMarks: number;
    passMarks: number;
  };
  submissions?: SubmissionItem[];
  answers?: SubmissionItem[];
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const submissionId = searchParams.get("submissionId");

  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");

      try {
        if (submissionId) {
          // নির্দিষ্ট একটি সাবমিশনের পূর্ণাঙ্গ রেজাল্ট ফেচ করা
          const res = await fetchClient(`/submissions/results/${submissionId}`);
          const payload = res?.data?.data || res?.data || res;
          setResult(payload);
        } else {
          // পূর্বে দেওয়া সব পরীক্ষার তালিকা আনা
          const res = await fetchClient("/submissions/my-assessments");
          const list = res?.data?.data || res?.data || [];
          setHistory(list);
          const completed = list.find(
            (item: any) =>
              item.status === "SUBMITTED" ||
              item.status === "COMPLETED" ||
              item.totalScore !== undefined ||
              item.score !== undefined
          );
          if (completed) {
            setResult(completed);
          }
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load examination results.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [submissionId]);

  if (loading) {
    return (
      <div className="space-y-5 max-w-4xl mx-auto py-4">
        <div className="h-40 bg-zinc-100 rounded-2xl animate-pulse" />
        <div className="h-64 bg-zinc-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  // মার্কস ও স্কোর গণনা
  const totalMarks =
    result?.assessment?.totalMarks ?? result?.totalMarks ?? 10;
  const passMarks =
    result?.assessment?.passMarks ?? result?.passMarks ?? 4;

  const score =
    result?.totalScore ??
    result?.score ??
    (result?.submissions
      ? result.submissions.reduce(
          (acc, cur) => acc + (cur.obtainedMarks || 0),
          0
        )
      : 0);

  // পাস মার্ক যদি ভুলবশত টোটাল মার্কসের বেশি দেওয়া থাকে, তবে ১০০% বা আনুপাতিক হারে পাস হিসেব করা
  const isPassed =
    result?.status === "PASSED" ||
    (passMarks <= totalMarks ? score >= passMarks : score === totalMarks || score >= Math.ceil(totalMarks * 0.4));

  const percentage =
    totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

  // প্রশ্ন ও উত্তরের তালিকা প্রসেস করা
  const reviewList = (result?.submissions || result?.answers || []).map(
    (item, index) => {
      const title = item.question?.title || `Question ${index + 1}`;
      const answer = item.answerText || "";
      const marksObtained = item.obtainedMarks ?? 0;
      const questionMarks = item.question?.marks ?? 10;
      const isCorrect =
        item.isCorrect ??
        (marksObtained > 0 ||
          (item.question?.correctAnswer &&
            item.question.correctAnswer.trim().toLowerCase() ===
              answer.trim().toLowerCase()));

      return {
        id: item.id || item.questionId || `ans-${index}`,
        title,
        answerText: answer,
        marksObtained,
        questionMarks,
        isCorrect,
      };
    }
  );

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            Assessment Scorecard
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Verified performance breakdown and evaluation status
          </p>
        </div>
        <Link
          href="/dashboard"
          className="px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-100/70 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer"
        >
          ← Back to Overview
        </Link>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
          {error}
        </div>
      )}

      {/* Main Scorecard Card */}
      {result ? (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-zinc-900">
                    {result?.assessment?.title || "Technical Assessment"}
                  </h2>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      isPassed
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {isPassed ? "PASSED" : "FAILED"}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Submission ID: {result.id || submissionId}
                </p>
              </div>

              {/* Score Highlight Metric */}
              <div className="flex items-baseline gap-2 bg-zinc-50 px-5 py-3 rounded-2xl border border-zinc-200/70">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">
                  {score}
                </span>
                <span className="text-xs font-medium text-zinc-400">
                  / {totalMarks} Marks ({percentage}%)
                </span>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="pt-6 space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-600">Score Requirement</span>
                <span className="text-zinc-400">
                  Pass Mark: {passMarks} Marks
                </span>
              </div>
              <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isPassed ? "bg-emerald-500" : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Breakdown */}
          {reviewList.length > 0 && (
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-zinc-900">
                Question Performance Review
              </h3>
              <div className="space-y-3">
                {reviewList.map((item, index) => (
                  <div
                    key={item.id || `ans-${index}`}
                    className="p-4 rounded-xl border border-zinc-200/60 bg-zinc-50/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-zinc-800">
                        {item.title}
                      </p>
                      <span
                        className={`text-[11px] font-semibold ${
                          item.isCorrect
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.isCorrect
                          ? `Correct (+${item.marksObtained} marks)`
                          : `Incorrect (${item.marksObtained} marks)`}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      Your Answer:{" "}
                      <span className="font-medium text-zinc-700">
                        {item.answerText}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 border border-zinc-200 hover:bg-zinc-100/70 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer"
            >
              Print Certificate / Scorecard
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium transition cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-zinc-200/80 rounded-2xl space-y-3">
          <p className="text-xs text-zinc-500">
            No completed assessments found to generate a scorecard.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium cursor-pointer"
          >
            Take an Assessment
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 max-w-4xl mx-auto">
          <div className="h-40 bg-zinc-100 rounded-2xl animate-pulse" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}