// src/app/dashboard/assessments/[id]/page.tsx
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchClient } from "@/lib/api";

interface Question {
    id: string;
    title: string;
    description?: string;
    options: string[];
    marks: number;
}

interface AssessmentDetail {
    id: string;
    title: string;
    durationMinutes: number;
    totalMarks: number;
    passMarks: number;
    questions?: Question[];
}

export default function TakeAssessmentPage() {
    const params = useParams();
    const router = useRouter();
    const assessmentId = params?.id as string;

    const [assessment, setAssessment] = useState<AssessmentDetail | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState<number>(0); // Seconds
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const isSubmittedRef = useRef(false);

    // ১. সাবমিট ফাংশন (টাইম শেষ হলে বা ইউজার বাটনে চাপলে রান হবে)
    const handleSubmit = useCallback(async () => {
        if (isSubmittedRef.current || submitting) return;
        isSubmittedRef.current = true;
        setSubmitting(true);
        setError("");

        try {
            const formattedAnswers = Object.entries(answers).map(
                ([questionId, answerText]) => ({
                    questionId,
                    answerText,
                }),
            );

            const res = await fetchClient(
                `/submissions/submit/${assessmentId}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        answers: formattedAnswers,
                    }),
                },
            );

            const submissionId = res?.data?.id || res?.data?.submissionId;
            // সাবমিট শেষে রেজাল্ট পেজে রিডাইরেক্ট
            if (submissionId) {
                router.push(`/dashboard/results?submissionId=${submissionId}`);
            } else {
                router.push("/dashboard/results");
            }
        } catch (err: any) {
            setError(err?.message || "Failed to submit assessment.");
            isSubmittedRef.current = false;
            setSubmitting(false);
        }
    }, [answers, assessmentId, router, submitting]);

    // ২. পরীক্ষা লোড করা এবং স্টার্ট লক করা
    useEffect(() => {
        async function initExam() {
            try {
                setLoading(true);

                // ক্যান্ডিডেটের টেস্ট স্টার্ট টাইম রেকর্ড করা
                await fetchClient(`/submissions/start/${assessmentId}`, {
                    method: "POST",
                }).catch(() => {
                    // অলরেডি শুরু করা থাকলে সাইলেন্টলি ইগনোর করবে
                });

                // অ্যাসেসমেন্ট এবং প্রশ্নপত্রের ডেটা আনা
                const res = await fetchClient(`/assessments/${assessmentId}`);
                const data = res?.data || res;
                setAssessment(data);

                const loadedQuestions = data?.questions || [];
                setQuestions(loadedQuestions);

                // টাইমার সেট (মিনিট থেকে সেকেন্ড)
                const initialSeconds = (data?.durationMinutes || 30) * 60;
                setTimeLeft(initialSeconds);
            } catch (err: any) {
                setError(err?.message || "Could not load the exam paper.");
            } finally {
                setLoading(false);
            }
        }

        if (assessmentId) {
            initExam();
        }
    }, [assessmentId]);

    // ৩. টাইমার কাউন্টডাউন ইন্টারভাল
    useEffect(() => {
        if (loading || timeLeft <= 0 || isSubmittedRef.current) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // সময় শেষ হলে অটোমেটিক সাবমিট
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, timeLeft, handleSubmit]);

    const handleSelectOption = (questionId: string, option: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: option,
        }));
    };

    // টাইমার ফরম্যাটিং (MM:SS)
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    if (loading) {
        return (
            <div className="space-y-4 max-w-4xl mx-auto py-8">
                <div className="h-20 bg-zinc-100 rounded-2xl animate-pulse" />
                <div className="h-64 bg-zinc-100 rounded-2xl animate-pulse" />
                <div className="h-64 bg-zinc-100 rounded-2xl animate-pulse" />
            </div>
        );
    }

    if (error && !assessment) {
        return (
            <div className="max-w-md mx-auto my-12 p-6 bg-white border border-red-200 rounded-2xl text-center space-y-3">
                <p className="text-xs font-semibold text-red-600">
                    Error Loading Assessment
                </p>
                <p className="text-xs text-zinc-500">{error}</p>
                <button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                    className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium cursor-pointer"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    const answeredCount = Object.keys(answers).length;

    return (
        <div className="max-w-4xl mx-auto pb-16 space-y-6">
            {/* Sticky Exam Progress & Live Timer Header */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div>
                    <h1 className="text-sm font-semibold text-zinc-900">
                        {assessment?.title || "Online Examination"}
                    </h1>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                        Answered: {answeredCount} of {questions.length}{" "}
                        questions
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-medium flex items-center gap-1.5 ${
                            timeLeft < 300
                                ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
                                : "bg-zinc-50 text-zinc-800 border-zinc-200"
                        }`}
                    >
                        <span>⏱️</span>
                        <span>{formatTime(timeLeft)}</span>
                    </div>

                    <button
                        type="button"
                        disabled={submitting}
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                        {submitting ? "Submitting..." : "Finish Test"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                    {error}
                </div>
            )}

            {/* Questions List */}
            <div className="space-y-5">
                {questions.length === 0 ? (
                    <div className="p-12 text-center bg-white border border-zinc-200/80 rounded-2xl">
                        <p className="text-xs text-zinc-500">
                            No questions found for this assessment.
                        </p>
                    </div>
                ) : (
                    questions.map((q, idx) => (
                        <div
                            key={q.id || idx}
                            className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_2px_8px_rgb(0,0,0,0.02)] space-y-4"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                                        Question {idx + 1}
                                    </span>
                                    <h3 className="text-sm font-medium text-zinc-900 leading-snug">
                                        {q.title}
                                    </h3>
                                    {q.description && (
                                        <p className="text-xs text-zinc-500 leading-relaxed">
                                            {q.description}
                                        </p>
                                    )}
                                </div>
                                <span className="shrink-0 px-2 py-0.5 rounded-lg bg-zinc-100 text-zinc-600 text-[10px] font-medium border border-zinc-200/60">
                                    {q.marks || 10} Marks
                                </span>
                            </div>

                            {/* Options Selection */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
                                {(q.options || []).map((option) => {
                                    const isSelected = answers[q.id] === option;
                                    return (
                                        <button
                                            key={`${q.id}-${option}`}
                                            type="button"
                                            onClick={() =>
                                                handleSelectOption(q.id, option)
                                            }
                                            className={`p-3.5 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between cursor-pointer ${
                                                isSelected
                                                    ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                                                    : "bg-zinc-50/50 hover:bg-zinc-100/70 border-zinc-200/80 text-zinc-700"
                                            }`}
                                        >
                                            <span>{option}</span>
                                            <span
                                                className={`h-4 w-4 rounded-full border flex items-center justify-center text-[10px] ${
                                                    isSelected
                                                        ? "border-white bg-white text-zinc-900 font-bold"
                                                        : "border-zinc-300"
                                                }`}
                                            >
                                                {isSelected && "✓"}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Bottom Sticky Submission Banner */}
            <div className="p-4 bg-white border border-zinc-200/80 rounded-2xl flex items-center justify-between shadow-sm">
                <p className="text-xs text-zinc-500">
                    Make sure to review all answers before submitting.
                    Submissions are final.
                </p>
                <button
                    type="button"
                    disabled={submitting}
                    onClick={handleSubmit}
                    className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                    {submitting ? "Submitting..." : "Submit Examination"}
                </button>
            </div>
        </div>
    );
}
