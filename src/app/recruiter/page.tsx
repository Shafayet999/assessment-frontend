// src/app/recruiter/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface AssessmentItem {
  id: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
  createdAt: string;
  _count?: {
    questions?: number;
    submissions?: number;
  };
}

export default function RecruiterDashboard() {
  const [assessments, setAssessments] = useState<AssessmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecruiterAssessments() {
      try {
        const res = await fetchClient("/assessments");
        setAssessments(res?.data || []);
      } catch (err) {
        console.error("Failed to load assessments", err);
      } finally {
        setLoading(false);
      }
    }

    loadRecruiterAssessments();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Total Assessments Created</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
            {loading ? "..." : assessments.length}
          </p>
          <span className="text-[10px] text-zinc-400 font-medium">Standard test pipelines</span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Evaluated Candidates</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
            {loading ? "..." : 48}
          </p>
          <span className="text-[10px] text-emerald-600 font-medium">↑ Across all assessments</span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Hiring Benchmark Pass-Rate</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
            {loading ? "..." : "72%"}
          </p>
          <span className="text-[10px] text-amber-600 font-medium">Qualified candidates</span>
        </div>
      </div>

      {/* Assessment Inventory Table */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Your Evaluation Tests</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Tests created for candidate technical rounds</p>
          </div>
          <Link
            href="/recruiter/assessments/create"
            className="text-xs font-medium text-zinc-900 hover:underline"
          >
            Create New →
          </Link>
        </div>

        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-zinc-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : assessments.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-500 space-y-3">
            <p>No assessments published yet.</p>
            <Link
              href="/recruiter/assessments/create"
              className="inline-block px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-medium cursor-pointer"
            >
              Build Your First Assessment
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-zinc-500 font-medium">
                  <th className="p-4">Assessment Title</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Total Marks</th>
                  <th className="p-4">Pass Mark</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {assessments.map((a, idx) => (
                  <tr key={a.id || `assessment-${idx}`} className="hover:bg-zinc-50/50 transition">
                    <td className="p-4 font-semibold text-zinc-800">
                      {a.title}
                    </td>
                    <td className="p-4 text-zinc-500">{a.durationMinutes} mins</td>
                    <td className="p-4 text-zinc-500">{a.totalMarks} Marks</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {a.passMarks} Marks
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/recruiter/candidates?assessmentId=${a.id}`}
                        className="px-3 py-1.5 border border-zinc-200 hover:bg-zinc-100 rounded-lg text-[11px] font-medium transition cursor-pointer"
                      >
                        Submissions →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}