// src/app/recruiter/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface AssessmentItem {
  id: string;
  title: string;
  description?: string;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
  createdAt?: string;
  questions?: unknown[];
  _count?: {
    questions?: number;
    submissions?: number;
  };
}

export default function RecruiterDashboard() {
  const [assessments, setAssessments] = useState<AssessmentItem[]>([]);
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Invite Modal States
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentItem | null>(null);
  const [candidateEmail, setCandidateEmail] = useState("candidate.test@dev.com");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);

        // Fetch assessments
        const resAssessments = await fetchClient("/assessments");
        const list = Array.isArray(resAssessments?.data)
          ? resAssessments.data
          : Array.isArray(resAssessments)
          ? resAssessments
          : [];
        setAssessments(list);

        // Fetch user credits
        const resUser = await fetchClient("/users/me").catch(() =>
          fetchClient("/auth/me").catch(() => null)
        );
        const userData = resUser?.data || resUser;
        if (userData && typeof userData.credits === "number") {
          setCredits(userData.credits);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Failed to load assessments data");
        }
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(id);
    setErrorMessage("");

    try {
      await fetchClient(`/assessments/${id}`, {
        method: "DELETE",
      });
      setAssessments((prev) => prev.filter((item) => item.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Failed to delete assessment");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const openInviteModal = (assessment: AssessmentItem) => {
    setSelectedAssessment(assessment);
    setInviteStatus(null);
    setInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setInviteModalOpen(false);
    setSelectedAssessment(null);
    setInviteStatus(null);
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssessment) return;

    setInviteLoading(true);
    setInviteStatus(null);

    try {
      await fetchClient("/submissions/invite", {
        method: "POST",
        body: JSON.stringify({
          assessmentId: selectedAssessment.id,
          candidateEmail: candidateEmail.trim(),
        }),
      });

      // Decrement visible credit on invite success if available
      setCredits((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));

      setInviteStatus({
        type: "success",
        message: `Successfully invited ${candidateEmail} to "${selectedAssessment.title}"!`,
      });
    } catch (err: unknown) {
      setInviteStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to send invitation.",
      });
    } finally {
      setInviteLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            Recruiter Overview
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage your evaluation pipelines, authored tests, and invite candidates
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/recruiter/questions/create"
            className="px-3.5 py-2 border border-zinc-200 hover:bg-zinc-100 rounded-xl text-xs font-medium text-zinc-700 transition cursor-pointer"
          >
            + Add Question
          </Link>
          <Link
            href="/recruiter/assessments/create"
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99] cursor-pointer"
          >
            + New Assessment
          </Link>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage("")}
            className="text-xs font-bold text-red-800 hover:opacity-75 cursor-pointer ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Credits Card */}
        <div className="p-5 bg-white border border-pink-200/80 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-zinc-500">
              Available Credits
            </p>
            <Link
              href="/recruiter/billing"
              className="text-[11px] font-semibold text-[#E2136E] hover:underline"
            >
              + Buy More
            </Link>
          </div>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
            {loading ? "..." : credits !== null ? credits : "—"}
          </p>
          <span className="text-[10px] text-pink-600 font-medium">
            1 Credit = 1 Candidate Invite
          </span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">
            Total Assessments
          </p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
            {loading ? "..." : assessments.length}
          </p>
          <span className="text-[10px] text-zinc-400 font-medium">
            Standard test pipelines
          </span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">
            Assigned Questions Pool
          </p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
            {loading
              ? "..."
              : assessments.reduce((acc, curr) => {
                  const count =
                    curr._count?.questions ?? curr.questions?.length ?? 0;
                  return acc + count;
                }, 0)}
          </p>
          <span className="text-[10px] text-emerald-600 font-medium">
            Active evaluation criteria
          </span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">
            Passing Benchmark
          </p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
            40% Pass Mark
          </p>
          <span className="text-[10px] text-amber-600 font-medium">
            Threshold configured
          </span>
        </div>
      </div>

      {/* Assessment Inventory Table */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              Your Evaluation Tests
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Tests created for candidate technical evaluation rounds
            </p>
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
              <div
                key={i}
                className="h-12 bg-zinc-100 rounded-xl animate-pulse"
              />
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
                {assessments.map((a) => (
                  <tr
                    key={a.id}
                    className="hover:bg-zinc-50/50 transition group"
                  >
                    <td className="p-4">
                      <p className="font-semibold text-zinc-800">{a.title}</p>
                      {a.description && (
                        <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                          {a.description}
                        </p>
                      )}
                    </td>
                    <td className="p-4 text-zinc-500 whitespace-nowrap">
                      {a.durationMinutes} mins
                    </td>
                    <td className="p-4 text-zinc-500 whitespace-nowrap">
                      {a.totalMarks} Marks
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {a.passMarks} Marks
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openInviteModal(a)}
                          className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-[11px] font-medium transition cursor-pointer"
                        >
                          Invite +
                        </button>
                        <Link
                          href={`/recruiter/candidates?assessmentId=${a.id}`}
                          className="px-3 py-1.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-lg text-[11px] font-medium transition cursor-pointer"
                        >
                          Submissions →
                        </Link>
                        <button
                          type="button"
                          disabled={deletingId === a.id}
                          onClick={() => handleDelete(a.id, a.title)}
                          className="px-2.5 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-[11px] font-medium transition cursor-pointer disabled:opacity-50"
                        >
                          {deletingId === a.id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invite Candidate Modal */}
      {inviteModalOpen && selectedAssessment && (
        <div className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-md p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">
                  Invite Candidate
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Send evaluation invite for:{" "}
                  <span className="font-medium text-zinc-800">
                    {selectedAssessment.title}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={closeInviteModal}
                className="text-zinc-400 hover:text-zinc-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {inviteStatus && (
              <div
                className={`p-3 rounded-xl text-xs border ${
                  inviteStatus.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}
              >
                {inviteStatus.message}
              </div>
            )}

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label
                  htmlFor="candidate-email-input"
                  className="block text-xs font-medium text-zinc-700 mb-1"
                >
                  Candidate Email Address
                </label>
                <input
                  id="candidate-email-input"
                  type="email"
                  required
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  placeholder="e.g. candidate.test@dev.com"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
                />
                <p className="text-[10px] text-zinc-400 mt-1">
                  Tip: Use default demo candidate{" "}
                  <code className="text-zinc-700 font-semibold">
                    candidate.test@dev.com
                  </code>
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={closeInviteModal}
                  className="px-3.5 py-2 border border-zinc-200 hover:bg-zinc-100 rounded-xl text-xs font-medium text-zinc-700 transition cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={inviteLoading}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition disabled:opacity-50 cursor-pointer"
                >
                  {inviteLoading ? "Sending Invite..." : "Send Invitation →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}