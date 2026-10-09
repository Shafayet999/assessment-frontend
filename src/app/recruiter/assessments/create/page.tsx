// src/app/recruiter/assessments/create/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface BankQuestion {
  id: string;
  title: string;
  marks: number;
  difficulty?: string;
  options?: string[];
}

export default function CreateAssessmentPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [passMarks, setPassMarks] = useState(20);

  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // পোস্টম্যানের আসল এন্ডপয়েন্ট: GET /assessments/questions
  useEffect(() => {
    async function loadBankQuestions() {
      setLoadingQuestions(true);
      try {
        const res = await fetchClient("/assessments/questions");
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setQuestions(list);
        if (list.length > 0) {
          // ডিফল্টভাবে প্রথম প্রশ্নটি সিলেক্ট করে রাখা
          setSelectedQuestionIds([list[0].id]);
        }
      } catch (err) {
        console.error("Failed to load questions:", err);
      } finally {
        setLoadingQuestions(false);
      }
    }
    loadBankQuestions();
  }, []);

  const toggleSelectQuestion = (questionId: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const calculatedTotalMarks = selectedQuestionIds.reduce((total, id) => {
    const q = questions.find((item) => item.id === id);
    return total + (q ? Number(q.marks) : 10);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (selectedQuestionIds.length === 0) {
      setError("Please select at least one question from the library.");
      setLoading(false);
      return;
    }

    try {
      // হুবহু পোস্টম্যানের পেলোড
      const payload = {
        title: title.trim(),
        description: description.trim() || "Comprehensive technical evaluation test.",
        durationMinutes: Number(durationMinutes),
        totalMarks: calculatedTotalMarks || 50,
        passMarks: Number(passMarks),
        questionIds: selectedQuestionIds,
      };

      await fetchClient("/assessments", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      router.push("/recruiter");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create assessment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            Create New Assessment
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure assessment timing, pass criteria and attach questions from the bank
          </p>
        </div>
        <Link
          href="/recruiter/questions/create"
          className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium transition cursor-pointer"
        >
          + Add New Question
        </Link>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2">
          <span>✕</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Configuration */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xs font-semibold text-zinc-800 uppercase tracking-wider">
            1. General Assessment Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label htmlFor="assessment-title" className="block text-xs font-medium text-zinc-700 mb-1">
                Assessment Title
              </label>
              <input
                id="assessment-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Front End Developer Assessment - 2026"
                required
                className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="assessment-desc" className="block text-xs font-medium text-zinc-700 mb-1">
                Description / Scope
              </label>
              <input
                id="assessment-desc"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Comprehensive evaluation of frontend architecture and modern web standards."
                className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="duration-minutes" className="block text-xs font-medium text-zinc-700 mb-1">
                Duration (Minutes)
              </label>
              <input
                id="duration-minutes"
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                min="5"
                required
                className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="pass-marks" className="block text-xs font-medium text-zinc-700 mb-1">
                Pass Marks
              </label>
              <input
                id="pass-marks"
                type="number"
                value={passMarks}
                onChange={(e) => setPassMarks(Number(e.target.value))}
                min="1"
                required
                className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="calculated-marks" className="block text-xs font-medium text-zinc-700 mb-1">
                Calculated Total Marks
              </label>
              <input
                id="calculated-marks"
                type="text"
                disabled
                value={`${calculatedTotalMarks} Marks (${selectedQuestionIds.length} Questions)`}
                className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Question Bank Selector */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-semibold text-zinc-800 uppercase tracking-wider">
                2. Select Questions from Library ({questions.length} Available)
              </h2>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Check the questions to attach to this evaluation paper
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-lg">
                {selectedQuestionIds.length} Attached
              </span>
              <Link
                href="/recruiter/questions/create"
                className="text-xs text-zinc-900 font-medium hover:underline"
              >
                + Create Another Question
              </Link>
            </div>
          </div>

          {loadingQuestions ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-zinc-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : questions.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500 border border-dashed border-zinc-200 rounded-xl space-y-3">
              <p>No questions found in the question bank repository.</p>
              <Link
                href="/recruiter/questions/create"
                className="inline-block px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium"
              >
                Create Your First Question
              </Link>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              {questions.map((q) => {
                const isSelected = selectedQuestionIds.includes(q.id);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => toggleSelectQuestion(q.id)}
                    className={`w-full p-4 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                        : "bg-zinc-50/50 hover:bg-zinc-100/70 border-zinc-200/80 text-zinc-800"
                    }`}
                  >
                    <div className="space-y-1 pr-4">
                      <p className="text-xs font-semibold leading-snug">{q.title}</p>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className={isSelected ? "text-zinc-300" : "text-zinc-400"}>
                          {q.marks || 10} Marks
                        </span>
                        {q.difficulty && (
                          <span
                            className={`px-1.5 py-0.5 rounded font-medium ${
                              isSelected
                                ? "bg-zinc-800 text-zinc-200"
                                : "bg-zinc-200 text-zinc-700"
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`h-5 w-5 rounded-lg border flex items-center justify-center text-xs shrink-0 ${
                        isSelected
                          ? "bg-white text-zinc-900 border-white font-bold"
                          : "border-zinc-300 bg-white"
                      }`}
                    >
                      {isSelected && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200/80">
          <button
            type="button"
            onClick={() => router.push("/recruiter")}
            className="px-4 py-2 border border-zinc-200 hover:bg-zinc-100 rounded-xl text-xs font-medium text-zinc-700 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || selectedQuestionIds.length === 0}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Publishing Test..." : "Save & Publish Assessment"}
          </button>
        </div>
      </form>
    </div>
  );
}