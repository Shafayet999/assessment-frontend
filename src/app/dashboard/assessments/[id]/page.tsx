// src/app/dashboard/assessments/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface QuestionOption {
  id?: string;
  text?: string;
}

interface Question {
  id: string;
  title: string;
  description?: string;
  marks: number;
  options: (string | QuestionOption)[];
}

interface AssessmentData {
  id: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  questions?: Question[];
}

export default function TakeAssessmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const attemptId = resolvedParams.id; // submission / attempt ID

  const router = useRouter();

  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ১. টেস্ট শুরু করা: POST /submissions/start/:attemptId
  useEffect(() => {
    async function startTestSession() {
      try {
        setLoading(true);
        setError("");

        const res = await fetchClient(`/submissions/start/${attemptId}`, {
          method: "POST",
        });

        const data = res?.data || res;
        const targetAssessment = data?.assessment || data;
        setAssessment(targetAssessment);

        // প্রশ্ন তালিকা হ্যান্ডলিং
        const qList: Question[] =
          targetAssessment?.questions ||
          targetAssessment?.assessmentQuestions?.map(
            (aq: { question: Question }) => aq.question
          ) ||
          data?.questions ||
          [];

        setQuestions(qList);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to start assessment session.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (attemptId) {
      startTestSession();
    }
  }, [attemptId]);

  // অপশন সিলেক্ট হ্যান্ডলার
  const handleSelectOption = (questionId: string, optionText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionText,
    }));
  };

  // টেস্ট সাবমিট হ্যান্ডলার: POST /submissions/submit/:attemptId
  const handleSubmitAssessment = async () => {
    const answeredCount = Object.keys(answers).length;
    if (questions.length > 0 && answeredCount < questions.length) {
      const confirmSubmit = window.confirm(
        `You answered ${answeredCount} of ${questions.length} questions. Submit now?`
      );
      if (!confirmSubmit) return;
    }

    setSubmitting(true);
    setError("");

    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, answerText]) => ({
          questionId,
          answerText,
        })
      );

      await fetchClient(`/submissions/submit/${attemptId}`, {
        method: "POST",
        body: JSON.stringify({
          answers: formattedAnswers,
        }),
      });

      // সাবমিশন শেষে রেজাল্ট পেজে রিডাইরেক্ট
      router.push(`/dashboard/results?submissionId=${attemptId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to submit assessment.");
      }
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4 py-8">
        <div className="h-8 w-48 bg-zinc-200 rounded-xl animate-pulse" />
        <div className="h-32 bg-zinc-100 rounded-2xl animate-pulse" />
        <div className="h-32 bg-zinc-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (error && !assessment) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center space-y-4 bg-white border border-zinc-200 rounded-2xl">
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
          ✕ {error}
        </div>
        <Link
          href="/dashboard"
          className="inline-block px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium"
        >
          ← Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      {/* Test Meta Header */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-4 z-20">
        <div>
          <h1 className="text-base font-bold text-zinc-900">
            {assessment?.title || "Technical Evaluation"}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Duration: {assessment?.durationMinutes || 60} Mins • Total Marks:{" "}
            {assessment?.totalMarks || 50}
          </p>
        </div>

        <button
          type="button"
          disabled={submitting}
          onClick={handleSubmitAssessment}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Submitting..." : "Submit Test"}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
          ✕ {error}
        </div>
      )}

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-8 text-center text-xs text-zinc-500">
          No questions attached to this evaluation paper.
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const selectedAnswer = answers[q.id];

            return (
              <div
                key={q.id}
                className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-zinc-900">
                    <span className="text-zinc-400 mr-2">Q{idx + 1}.</span>
                    {q.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-lg shrink-0">
                    {q.marks || 10} Marks
                  </span>
                </div>

                {q.description && (
                  <p className="text-xs text-zinc-500 font-mono bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                    {q.description}
                  </p>
                )}

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {q.options?.map((opt: string | QuestionOption) => {
                    const optText =
                      typeof opt === "string" ? opt : opt?.text || "";
                    const isChecked = selectedAnswer === optText;
                    const optionKey =
                      typeof opt === "object" && opt?.id
                        ? opt.id
                        : `${q.id}-${optText}`;

                    return (
                      <button
                        key={optionKey}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optText)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                            : "bg-zinc-50/50 hover:bg-zinc-100/70 border-zinc-200 text-zinc-800"
                        }`}
                      >
                        <span className="font-medium pr-2">{optText}</span>
                        <span
                          className={`h-4 w-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                            isChecked
                              ? "bg-white text-zinc-900 border-white font-bold"
                              : "border-zinc-300 bg-white"
                          }`}
                        >
                          {isChecked && "✓"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Submit Banner */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          disabled={submitting}
          onClick={handleSubmitAssessment}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Submitting Answers..." : "Submit Assessment"}
        </button>
      </div>
    </div>
  );
}