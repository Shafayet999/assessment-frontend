// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchClient } from "@/lib/api";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface StatsData {
  totalUsers?: number;
  totalAssessments?: number;
  totalSubmissions?: number;
  passedCount?: number;
  revenue?: number;
  recentActivity?: Array<{
    id: string;
    action: string;
    user?: string;
    createdAt: string;
  }>;
}

// Chart Visualization Sample Timeline
const weeklyActivityData = [
  { day: "Mon", submissions: 12, passes: 9 },
  { day: "Tue", submissions: 19, passes: 14 },
  { day: "Wed", submissions: 15, passes: 11 },
  { day: "Thu", submissions: 27, passes: 20 },
  { day: "Fri", submissions: 34, passes: 26 },
  { day: "Sat", submissions: 22, passes: 18 },
  { day: "Sun", submissions: 18, passes: 15 },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function loadStats() {
      try {
        const res = await fetchClient("/admin/dashboard-stats");
        setStats(res?.data || res);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Registered Users</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
            {loading ? "..." : stats?.totalUsers ?? 24}
          </p>
          <span className="text-[10px] text-emerald-600 font-medium">↑ Active Talents</span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Active Assessments</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
            {loading ? "..." : stats?.totalAssessments ?? 8}
          </p>
          <span className="text-[10px] text-zinc-400 font-medium">Evaluations published</span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Total Submissions</p>
          <p className="text-2xl font-bold tracking-tight text-zinc-900 mt-2">
            {loading ? "..." : stats?.totalSubmissions ?? 147}
          </p>
          <span className="text-[10px] text-blue-600 font-medium">Graded attempts</span>
        </div>

        <div className="p-5 bg-white border border-zinc-200/80 rounded-2xl shadow-sm">
          <p className="text-xs font-medium text-zinc-500">Pass Rate Efficiency</p>
          <p className="text-2xl font-bold tracking-tight text-emerald-600 mt-2">
            {loading ? "..." : "78.4%"}
          </p>
          <span className="text-[10px] text-zinc-400 font-medium">Verified candidates</span>
        </div>
      </div>

      {/* Visual Analytics Charts (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart: Submission Traffic */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Submission Volume</h3>
              <p className="text-xs text-zinc-400">7-day examination traffic distribution</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-700">
              Weekly
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyActivityData}>
                  <defs>
                    <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#18181b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                  <XAxis dataKey="day" stroke="#a1a1aa" fontSize={11} tickLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      border: "1px solid #e4e4e7",
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="submissions"
                    stroke="#18181b"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="urlColorSub"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full bg-zinc-50 rounded-xl animate-pulse" />
            )}
          </div>
        </div>

        {/* Bar Chart: Successful Passes vs Attempts */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Pass vs Attempt Ratio</h3>
              <p className="text-xs text-zinc-400">Total attempts compared with passed candidates</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
              Conversion
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                  <XAxis dataKey="day" stroke="#a1a1aa" fontSize={11} tickLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      border: "1px solid #e4e4e7",
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  />
                  <Bar dataKey="submissions" fill="#e4e4e7" radius={[4, 4, 0, 0]} name="Submissions" />
                  <Bar dataKey="passes" fill="#18181b" radius={[4, 4, 0, 0]} name="Passed" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full bg-zinc-50 rounded-xl animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Quick Governance Audit Banner */}
      <div className="p-6 bg-white border border-zinc-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">Security & Access Management</h4>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage user roles, review live audit traces, or revoke test authorizations.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <a
            href="/admin/users"
            className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium transition cursor-pointer"
          >
            Manage Users →
          </a>
          <a
            href="/admin/audit-logs"
            className="px-3.5 py-2 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium transition cursor-pointer"
          >
            Audit Logs
          </a>
        </div>
      </div>
    </div>
  );
}