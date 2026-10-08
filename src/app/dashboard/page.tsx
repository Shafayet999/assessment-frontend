// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

export default function CandidateDashboard() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAssessments() {
      try {
        const res = await fetchClient("/submissions/my-assessments");
        setAssessments(res?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAssessments();
  }, []);

  return (
    <div className="space-y-7">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Assigned Assessments</p>
          <p className="text-2xl font-semibold tracking-tight text-zinc-900 mt-2">
            {loading ? "..." : assessments.length}
          </p>
        </div>
        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Completed Tests</p>
          <p className="text-2xl font-semibold tracking-tight text-zinc-900 mt-2">
            {loading ? "..." : assessments.filter((a) => a.status === "COMPLETED").length}
          </p>
        </div>
        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Average Performance</p>
          <p className="text-2xl font-semibold tracking-tight text-emerald-600 mt-2">
            Active
          </p>
        </div>
      </div>

      {/* Assessment List */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-zinc-900">Your Scheduled Assessments</h3>
          <span className="text-xs text-zinc-400">Read instructions before starting</span>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-16 bg-zinc-100/60 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : assessments.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-zinc-200 rounded-xl">
            <p className="text-xs text-zinc-500">No assessments assigned yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {assessments.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-zinc-200/70 rounded-xl flex items-center justify-between hover:border-zinc-300 transition"
              >
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900">
                    {item.assessment?.title || "Assessment Test"}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Duration: {item.assessment?.durationMinutes || 60} mins | Pass Mark: {item.assessment?.passMarks || 20}
                  </p>
                </div>

                <Link
                  href={`/dashboard/assessments/${item.assessmentId || item.id}`}
                  className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                >
                  Start Test →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}