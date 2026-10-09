// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface AssessmentInfo {
  id: string;
  title: string;
  description?: string;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
}

interface AssignedSubmission {
  id: string; // attemptId / submissionId
  assessmentId: string;
  status: "PENDING" | "STARTED" | "SUBMITTED";
  totalScore?: number;
  assessment: AssessmentInfo;
}

export default function CandidateDashboardPage() {
  const [assignedTests, setAssignedTests] = useState<AssignedSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMyAssessments() {
      try {
        setLoading(true);
        // GET /submissions/my-assessments
        const res = await fetchClient("/submissions/my-assessments");
        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];
        setAssignedTests(list);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load assigned assessments");
        }
      } finally {
        setLoading(false);
      }
    }

    loadMyAssessments();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
          My Assigned Assessments
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Select an assigned test to begin your evaluation session
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2">
          <span>✕</span>
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-28 bg-zinc-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : assignedTests.length === 0 ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center text-xs text-zinc-500 space-y-2">
          <p className="font-medium text-zinc-700">No invitations received yet</p>
          <p>
            When a recruiter invites you to an assessment, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {assignedTests.map((item) => {
            const isSubmitted = item.status === "SUBMITTED";

            return (
              <div
                key={item.id}
                className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900">
                      {item.assessment?.title || "Technical Assessment"}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        isSubmitted
                          ? "bg-zinc-100 text-zinc-600 border-zinc-200"
                          : item.status === "STARTED"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500">
                    Duration: {item.assessment?.durationMinutes || 60} mins • Total Marks:{" "}
                    {item.assessment?.totalMarks || 50} • Pass Marks:{" "}
                    {item.assessment?.passMarks || 20}
                  </p>
                </div>

                <div>
                  {isSubmitted ? (
                    <Link
                      href={`/dashboard/results?submissionId=${item.id}`}
                      className="px-4 py-2 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer"
                    >
                      View Result →
                    </Link>
                  ) : (
                    <Link
                      href={`/dashboard/assessments/${item.id}`}
                      className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99] cursor-pointer"
                    >
                      {item.status === "STARTED" ? "Resume Test →" : "Start Test →"}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}