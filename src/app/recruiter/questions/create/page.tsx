// src/app/recruiter/questions/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface OptionItem {
  id: string;
  text: string;
}

export default function CreateQuestionPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [marks, setMarks] = useState(10);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const [options, setOptions] = useState<OptionItem[]>([
    { id: "opt-1", text: "" },
    { id: "opt-2", text: "" },
    { id: "opt-3", text: "" },
    { id: "opt-4", text: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateOptionText = (optionId: string, text: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === optionId ? { ...opt, text } : opt))
    );
  };

  const addOption = () => {
    if (options.length >= 6) return;
    setOptions((prev) => [...prev, { id: `opt-${Date.now()}`, text: "" }]);
  };

  const removeOption = (optionId: string, index: number) => {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((opt) => opt.id !== optionId));
    if (correctAnswerIndex >= index && correctAnswerIndex > 0) {
      setCorrectAnswerIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const filledOptions = options.map((o) => o.text.trim());
    if (filledOptions.some((txt) => !txt)) {
      setError("Please fill in all 4 option choices.");
      setLoading(false);
      return;
    }

    const correct = filledOptions[correctAnswerIndex];
    if (!correct) {
      setError("Please select a valid correct answer choice.");
      setLoading(false);
      return;
    }

    try {
      // হুবহু পোস্টম্যান পেলোড
      const payload = {
        title: title.trim(),
        description: description.trim() || "Technical evaluation question.",
        type: "MCQ",
        difficulty: difficulty,
        options: filledOptions,
        correctAnswer: correct,
        marks: Number(marks),
      };

      // আসল এন্ডপয়েন্ট: /assessments/questions
      await fetchClient("/assessments/questions", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // প্রশ্ন সেভ শেষে সরাসরি অ্যাসেসমেন্ট ক্রিয়েট পেজে চলে যাবে
      router.push("/recruiter/assessments/create");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create question in database.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            Create Question in Question Bank
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Create standardized technical questions in the central database
          </p>
        </div>
        <Link
          href="/recruiter/assessments/create"
          className="px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-100 rounded-xl text-xs font-medium text-zinc-700 transition"
        >
          ← Back to Assessment Builder
        </Link>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2">
          <span>✕</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xs font-semibold text-zinc-800 uppercase tracking-wider">
            1. Question Definition
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="question-title" className="block text-xs font-medium text-zinc-700 mb-1">
                Question Prompt / Title
              </label>
              <input
                id="question-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. What is the meaning of null in JavaScript?"
                required
                className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="question-description" className="block text-xs font-medium text-zinc-700 mb-1">
                Description / Context
              </label>
              <textarea
                id="question-description"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief explanation or evaluation criteria..."
                className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="difficulty-select" className="block text-xs font-medium text-zinc-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  id="difficulty-select"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                >
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                </select>
              </div>

              <div>
                <label htmlFor="question-marks" className="block text-xs font-medium text-zinc-700 mb-1">
                  Marks Assigned
                </label>
                <input
                  id="question-marks"
                  type="number"
                  min="1"
                  max="50"
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-semibold text-zinc-800 uppercase tracking-wider">
                2. MCQ Options & Correct Answer
              </h2>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Click the circular button to designate the correct answer choice
              </p>
            </div>
            {options.length < 6 && (
              <button
                type="button"
                onClick={addOption}
                className="px-3 py-1 border border-zinc-200 hover:bg-zinc-100 rounded-xl text-xs font-medium text-zinc-700 transition cursor-pointer"
              >
                + Add Option
              </button>
            )}
          </div>

          <div className="space-y-3 pt-2">
            {options.map((opt, idx) => {
              const isCorrect = correctAnswerIndex === idx;
              return (
                <div
                  key={opt.id}
                  className={`p-3.5 rounded-xl border transition flex items-center gap-3 ${
                    isCorrect
                      ? "border-emerald-500 bg-emerald-50/20"
                      : "border-zinc-200 bg-zinc-50/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setCorrectAnswerIndex(idx)}
                    title="Mark as correct answer"
                    className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition cursor-pointer ${
                      isCorrect
                        ? "border-emerald-600 bg-emerald-600 text-white font-bold"
                        : "border-zinc-300 hover:border-zinc-400 bg-white"
                    }`}
                  >
                    {isCorrect && "✓"}
                  </button>

                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => updateOptionText(opt.id, e.target.value)}
                    placeholder={`Option Choice ${idx + 1}`}
                    required
                    className="w-full px-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />

                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(opt.id, idx)}
                      className="text-xs text-zinc-400 hover:text-red-500 transition px-2 py-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/recruiter/assessments/create"
            className="px-4 py-2 border border-zinc-200 hover:bg-zinc-100 rounded-xl text-xs font-medium text-zinc-700 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Saving Question..." : "Save to Question Bank"}
          </button>
        </div>
      </form>
    </div>
  );
}