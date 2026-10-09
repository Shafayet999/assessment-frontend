// src/app/recruiter/candidates/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface CandidateInfo {
  id: string;
  name: string;
  email: string;
}

interface SubmissionItem {
  id: string; // submission id
  candidateId: string;
  assessmentId: string;
  status: string;
  startedAt?: string;
  submittedAt?: string;
  totalScore: number;
  feedback?: string | null;
  createdAt: string;
  updatedAt: string;
  candidate: CandidateInfo;
}

interface AssessmentDetail {
  id: string;
  title: string;
  totalMarks: number;
  passMarks: number;
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
  const [assessmentInfo, setAssessmentInfo] = useState<AssessmentDetail | null>(null);
  const [candidates, setCandidates] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ১. ড্রপডাউনের জন্য সব অ্যাসেসমেন্ট তালিকা লোড করা
  useEffect(() => {
    async function loadAssessments() {
      try {
        const res = await fetchClient("/assessments");
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setAssessments(list);

        if (!initialAssessmentId && list.length > 0) {
          setSelectedAssessmentId(list[0].id);
        }
      } catch (err: unknown) {
        console.error("Failed to load assessments list", err);
      }
    }

    loadAssessments();
  }, [initialAssessmentId]);

  // ২. সিলেক্টেড অ্যাসেসমেন্টের আসল সাবমিশন ফেচ করা
  useEffect(() => {
    if (!selectedAssessmentId) {
      setLoading(false);
      return;
    }

    async function loadCandidatesData() {
      setLoading(true);
      setError("");

      try {
        const res = await fetchClient(`/submissions/assessment/${selectedAssessmentId}`);
        const payloadData = res?.data || res;
        const candidateList = Array.isArray(payloadData?.candidates)
          ? payloadData.candidates
          : [];

        setCandidates(candidateList);
        if (payloadData?.assessment) {
          setAssessmentInfo(payloadData.assessment);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load candidate submissions.");
        }
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    }

    loadCandidatesData();
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

        {/* Assessment Dropdown Filter */}
        {assessments.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 font-medium">Select Test:</span>
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

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center gap-2">
          <span>✕</span>
          <span>{error}</span>
        </div>
      )}

      {/* Target Assessment Meta Info */}
      {assessmentInfo && (
        <div className="p-4 bg-white border border-zinc-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-zinc-400">Target Assessment: </span>
            <span className="font-semibold text-zinc-900">{assessmentInfo.title}</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <span>Total Marks: <strong className="text-zinc-800">{assessmentInfo.totalMarks}</strong></span>
            <span>Pass Marks: <strong className="text-zinc-800">{assessmentInfo.passMarks}</strong></span>
            <span>Candidates: <strong className="text-zinc-800">{candidates.length}</strong></span>
          </div>
        </div>
      )}

      {/* Candidates Table */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-zinc-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : candidates.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-500 space-y-3">
            <p>No candidate submissions received for this assessment yet.</p>
            <Link
              href="/recruiter"
              className="inline-block px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer"
            >
              ← Back to Assessments
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-zinc-500 font-medium">
                  <th className="p-4">Candidate Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Marks Obtained</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted At</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {candidates.map((item) => {
                  const total = assessmentInfo?.totalMarks ?? 10;
                  const passScore = assessmentInfo?.passMarks ?? 4;
                  
                  // সেফটি পাস লজিক
                  const isPassed =
                    passScore <= total
                      ? item.totalScore >= passScore
                      : item.totalScore === total || item.totalScore >= Math.ceil(total * 0.4);

                  return (
                    <tr key={item.id} className="hover:bg-zinc-50/50 transition">
                      <td className="p-4 font-semibold text-zinc-900">
                        {item.candidate?.name || "Jane Candidate"}
                      </td>
                      <td className="p-4 text-zinc-500">
                        {item.candidate?.email || "candidate@dev.com"}
                      </td>
                      <td className="p-4 font-semibold text-zinc-800">
                        {item.totalScore} Marks
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            item.status === "SUBMITTED"
                              ? isPassed
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-red-50 text-red-700 border-red-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {item.status === "SUBMITTED"
                            ? `${item.status} (${isPassed ? "PASSED" : "FAILED"})`
                            : item.status}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-400 text-[11px]">
                        {item.submittedAt
                          ? new Date(item.submittedAt).toLocaleDateString()
                          : "In Progress"}
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/dashboard/results?submissionId=${item.id}`}
                          className="px-3 py-1.5 border border-zinc-200 hover:bg-zinc-100 rounded-lg text-[11px] font-medium transition cursor-pointer"
                        >
                          Inspect Result →
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