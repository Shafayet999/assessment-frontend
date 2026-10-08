// src/app/recruiter/assessments/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchClient } from "@/lib/api";

interface OptionItem {
  id: string;
  text: string;
}

interface QuestionInput {
  id: string;
  title: string;
  description: string;
  marks: number;
  options: OptionItem[];
  correctAnswer: string;
}

export default function CreateAssessmentPage() {
  const router = useRouter();

  // Basic Form State
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [passMarks, setPassMarks] = useState(20);

  // Dynamic Questions State
  const [questions, setQuestions] = useState<QuestionInput[]>([
    {
      id: "q-initial-1",
      title: "What is the primary benefit of Next.js Server Components?",
      description: "Explain based on network bundle size and initial hydration.",
      marks: 10,
      options: [
        { id: "opt-1-1", text: "Zero bundle impact on client" },
        { id: "opt-1-2", text: "Better browser cache only" },
        { id: "opt-1-3", text: "Replaces database engines" },
        { id: "opt-1-4", text: "None of the above" },
      ],
      correctAnswer: "Zero bundle impact on client",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addQuestion = () => {
    const timestamp = Date.now();
    const newQ: QuestionInput = {
      id: `q-${timestamp}`,
      title: "",
      description: "",
      marks: 10,
      options: [
        { id: `opt-${timestamp}-1`, text: "Option A" },
        { id: `opt-${timestamp}-2`, text: "Option B" },
        { id: `opt-${timestamp}-3`, text: "Option C" },
        { id: `opt-${timestamp}-4`, text: "Option D" },
      ],
      correctAnswer: "Option A",
    };
    setQuestions((prev) => [...prev, newQ]);
  };

  const removeQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const updateQuestion = (
    questionId: string,
    field: "title" | "description" | "marks" | "correctAnswer",
    value: string | number
  ) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (
    questionId: string,
    optionId: string,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          options: q.options.map((opt) =>
            opt.id === optionId ? { ...opt, text: value } : opt
          ),
        };
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const totalMarks = questions.reduce(
        (sum, q) => sum + Number(q.marks),
        0
      );

      const payload = {
        title,
        durationMinutes: Number(durationMinutes),
        passMarks: Number(passMarks),
        totalMarks: totalMarks || 50,
        questions: questions.map((q) => ({
          title: q.title,
          description: q.description,
          marks: Number(q.marks),
          options: q.options.map((opt) => opt.text),
          correctAnswer: q.correctAnswer,
        })),
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
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
          Create New Assessment
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Configure test parameters and compose technical evaluation questions
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: General Parameters */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xs font-semibold text-zinc-800 uppercase tracking-wider">
            1. General Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label
                htmlFor="assessment-title"
                className="block text-xs font-medium text-zinc-700 mb-1"
              >
                Assessment Title
              </label>
              <input
                id="assessment-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Fullstack React & Node.js Evaluation"
                required
                className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
              />
            </div>

            <div>
              <label
                htmlFor="duration-minutes"
                className="block text-xs font-medium text-zinc-700 mb-1"
              >
                Duration (Minutes)
              </label>
              <input
                id="duration-minutes"
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                min="5"
                required
                className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
              />
            </div>

            <div>
              <label
                htmlFor="pass-marks"
                className="block text-xs font-medium text-zinc-700 mb-1"
              >
                Pass Marks
              </label>
              <input
                id="pass-marks"
                type="number"
                value={passMarks}
                onChange={(e) => setPassMarks(Number(e.target.value))}
                min="1"
                required
                className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
              />
            </div>

            <div>
              <label
                htmlFor="total-marks-preview"
                className="block text-xs font-medium text-zinc-700 mb-1"
              >
                Calculated Total Marks
              </label>
              <input
                id="total-marks-preview"
                type="text"
                disabled
                value={`${questions.reduce((sum, q) => sum + Number(q.marks), 0)} Marks`}
                className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Dynamic Question Builder */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-zinc-800 uppercase tracking-wider">
              2. Assessment Questions ({questions.length})
            </h2>
            <button
              type="button"
              onClick={addQuestion}
              className="px-3 py-1.5 border border-zinc-200 hover:bg-zinc-100 rounded-xl text-xs font-medium text-zinc-800 transition cursor-pointer"
            >
              + Add Question
            </button>
          </div>

          <div className="space-y-4">
            {questions.map((q, qIndex) => (
              <div
                key={q.id}
                className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900">
                    Question #{qIndex + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(q.id)}
                      className="text-xs text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="md:col-span-3">
                    <label
                      htmlFor={`q-title-${q.id}`}
                      className="block text-[11px] font-medium text-zinc-600 mb-1"
                    >
                      Question Prompt
                    </label>
                    <input
                      id={`q-title-${q.id}`}
                      type="text"
                      value={q.title}
                      onChange={(e) =>
                        updateQuestion(q.id, "title", e.target.value)
                      }
                      placeholder="e.g. What is the output of typeof null?"
                      required
                      className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`q-marks-${q.id}`}
                      className="block text-[11px] font-medium text-zinc-600 mb-1"
                    >
                      Marks Assigned
                    </label>
                    <input
                      id={`q-marks-${q.id}`}
                      type="number"
                      value={q.marks}
                      onChange={(e) =>
                        updateQuestion(q.id, "marks", Number(e.target.value))
                      }
                      min="1"
                      className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>
                </div>

                {/* Question Options */}
                <div className="space-y-2 pt-2">
                  <p className="block text-[11px] font-medium text-zinc-600">
                    Answer Options (Set 4 Choices)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => (
                      <div
                        key={opt.id}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={opt.text}
                          onChange={(e) =>
                            updateOption(q.id, opt.id, e.target.value)
                          }
                          placeholder="Option choice"
                          required
                          className="w-full px-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            disabled={loading}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Publishing Test..." : "Save & Publish Assessment"}
          </button>
        </div>
      </form>
    </div>
  );
}