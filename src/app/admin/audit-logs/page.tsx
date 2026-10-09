// src/app/admin/audit-logs/page.tsx
"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { fetchClient } from "@/lib/api";

interface AuditLogItem {
  id: string;
  userId?: string | null;
  action: string;
  entity: string;
  entityId: string;
  details: Record<string, unknown> | null;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

function AuditLogsContent() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [selectedDetails, setSelectedDetails] = useState<AuditLogItem | null>(null);

  useEffect(() => {
    async function loadAuditLogs() {
      try {
        setLoading(true);
        // Fallback checks for audit-logs endpoints
        const res = await fetchClient("/audit-logs").catch(() =>
          fetchClient("/admin/audit-logs").catch(() => ({ data: [] }))
        );
        const logData = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        setLogs(logData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("Failed to load audit logs");
        }
      } finally {
        setLoading(false);
      }
    }

    loadAuditLogs();
  }, []);

  // Filter logs based on search and action filter
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesAction = actionFilter === "ALL" || log.action === actionFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        log.entityId.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.entity.toLowerCase().includes(query) ||
        (log.user?.email && log.user.email.toLowerCase().includes(query)) ||
        (log.user?.name && log.user.name.toLowerCase().includes(query));

      return matchesAction && matchesSearch;
    });
  }, [logs, actionFilter, searchQuery]);

  const uniqueActions = useMemo(() => {
    const actions = new Set(logs.map((l) => l.action));
    return Array.from(actions);
  }, [logs]);

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "CREDIT_PURCHASE_COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PAYMENT_REFUNDED":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "PAYMENT_FAILED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              System Audit Logs
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-zinc-900 text-white rounded-full">
              Admin Only
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Immutable tracking record of financial transactions, credits allocation, and billing operations
          </p>
        </div>

        <Link
          href="/admin"
          className="px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer w-fit"
        >
          ← Back to Admin Console
        </Link>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center justify-between">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage("")}
            className="text-xs font-bold text-rose-800 hover:opacity-75 cursor-pointer ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 border border-zinc-200/80 rounded-2xl shadow-2xs">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by User, Email, Action, or Entity ID..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 focus:bg-white"
          />
          <svg
            className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-zinc-50/70 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 focus:bg-white cursor-pointer"
          >
            <option value="ALL">All Actions ({logs.length})</option>
            {uniqueActions.map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-zinc-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-400 space-y-2">
            <p className="font-medium text-zinc-600">No audit log records found</p>
            <p>No actions have matched the current search criteria or filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200/80 bg-zinc-50/60 text-zinc-500 font-medium">
                  <th className="p-3.5 whitespace-nowrap">Timestamp</th>
                  <th className="p-3.5 whitespace-nowrap">User Context</th>
                  <th className="p-3.5 whitespace-nowrap">Action Type</th>
                  <th className="p-3.5 whitespace-nowrap">Target Entity</th>
                  <th className="p-3.5 whitespace-nowrap">Entity ID</th>
                  <th className="p-3.5 text-right whitespace-nowrap">Audit Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-50/60 transition">
                    <td className="p-3.5 text-zinc-500 whitespace-nowrap font-mono text-[11px]">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3.5">
                      {log.user ? (
                        <div>
                          <p className="font-semibold text-zinc-800">{log.user.name}</p>
                          <p className="text-[11px] text-zinc-400">{log.user.email}</p>
                        </div>
                      ) : (
                        <span className="text-zinc-400 font-mono text-[11px]">System / Anonymous</span>
                      )}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getActionBadgeColor(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 font-medium text-zinc-700 whitespace-nowrap">
                      {log.entity}
                    </td>
                    <td className="p-3.5 font-mono text-zinc-600 text-[11px] whitespace-nowrap">
                      {log.entityId}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      {log.details ? (
                        <button
                          type="button"
                          onClick={() => setSelectedDetails(log)}
                          className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-lg text-[11px] font-medium text-zinc-700 transition cursor-pointer"
                        >
                          View Payload →
                        </button>
                      ) : (
                        <span className="text-zinc-400 text-[11px]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* JSON Payload Inspector Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-lg p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">Audit Detail Payload</h3>
                <p className="text-[11px] text-zinc-400 mt-0.5 font-mono">
                  {selectedDetails.action} • {selectedDetails.entityId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetails(null)}
                className="text-zinc-400 hover:text-zinc-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-zinc-950 text-zinc-100 rounded-xl p-4 font-mono text-xs overflow-x-auto max-h-72 border border-zinc-800">
              <pre>{JSON.stringify(selectedDetails.details, null, 2)}</pre>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setSelectedDetails(null)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold shadow-2xs transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminAuditLogsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 max-w-6xl mx-auto">
          <div className="h-60 bg-zinc-100 rounded-2xl animate-pulse" />
        </div>
      }
    >
      <AuditLogsContent />
    </Suspense>
  );
}