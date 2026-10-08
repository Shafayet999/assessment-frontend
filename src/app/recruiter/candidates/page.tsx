// src/app/recruiter/candidates/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface SubmissionItem {
  id: string;
  candidateName?: string;
  candidateEmail?: string;
  user?: {
    name: string;
    email: string;
  };
  score?: number;
  status?: string;
  submittedAt?: string;
  createdAt?: string;
}

interface AssessmentOption {
  id: string;
  title: string;
}

function RecruiterCandidatesContent() {
  const searchParams = useSearchParams();
  const initialAssessmentId = searchParams.get("assessmentId") || "";

  const [assessments, setAssessments] = useState<AssessmentOption[]>([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>(initialAssessmentId);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ১. রিক্রুটারের তৈরি করা অ্যাসেসমেন্টগুলো লোড করা
  useEffect(() => {
    async function loadAssessments() {
      try {
        const res = await fetchClient("/assessments");
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setAssessments(list);

        // যদি URL-এ কোনো assessmentId না থাকে, তবে প্রথম অ্যাসেসমেন্টটি ডিফল্ট সিলেক্ট করবে
        if (!initialAssessmentId && list.length > 0) {
          setSelectedAssessmentId(list[0].id);
        }
      } catch (err) {
        console.error("Failed to load assessments list", err);
      }
    }

    loadAssessments();
  }, [initialAssessmentId]);

  // ২. সিলেক্টেড অ্যাসেসমেন্টের ক্যান্ডিডেট সাবমিশনগুলো ফেচ করা
  useEffect(() => {
    if (!selectedAssessmentId) {
      setLoading(false);
      return;
    }

    async function loadSubmissions() {
      setLoading(true);
      try {
        const res = await fetchClient(`/submissions/assessment/${selectedAssessmentId}`);
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setSubmissions(list);
      } catch (err) {
        // কোনো সাবমিশন না থাকলে যেন ক্র্যাশ বা আনহ্যান্ডেল্ড এরর না দেয়
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    }

    loadSubmissions();
  }, [selectedAssessmentId]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            Candidate Pipeline & Submissions
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Review test submissions, evaluation marks, and candidate status
          </p>
        </div>

        {/* Assessment Filter Dropdown */}
        {assessments.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 font-medium">Test:</span>
            <select
              value={selectedAssessmentId}
              onChange={(e) => setSelectedAssessmentId(e.target.value)}
              className="px-3 py-1.5 bg-white border border-zinc-200 rounded-xl text-xs font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
            >
              {assessments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Candidates Table */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-zinc-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-500 space-y-3">
            <p>No candidate submissions received for this assessment yet.</p>
            <Link
              href="/recruiter"
              className="inline-block px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer"
            >
              ← Back to Overview
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-zinc-500 font-medium">
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Marks Obtained</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {submissions.map((sub) => {
                  const candidateName =
                    sub.candidateName || sub.user?.name || "Candidate";
                  const candidateEmail =
                    sub.candidateEmail || sub.user?.email || "candidate@dev.com";
                  const isPassed =
                    sub.status === "PASSED" || (sub.score !== undefined && sub.score >= 20);

                  return (
                    <tr key={sub.id} className="hover:bg-zinc-50/50 transition">
                      <td className="p-4 font-semibold text-zinc-800">
                        {candidateName}
                      </td>
                      <td className="p-4 text-zinc-500">{candidateEmail}</td>
                      <td className="p-4 font-medium text-zinc-700">
                        {sub.score !== undefined ? `${sub.score} Marks` : "Pending"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            isPassed
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {sub.status || (isPassed ? "PASSED" : "SUBMITTED")}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/dashboard/results?submissionId=${sub.id}`}
                          className="px-3 py-1.5 border border-zinc-200 hover:bg-zinc-100 rounded-lg text-[11px] font-medium transition cursor-pointer"
                        >
                          Inspect Sheet →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecruiterCandidatesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 max-w-5xl mx-auto">
          <div className="h-40 bg-zinc-100 rounded-2xl animate-pulse" />
        </div>
      }
    >
      <RecruiterCandidatesContent />
    </Suspense>
  );
}