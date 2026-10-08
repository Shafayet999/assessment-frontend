// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchClient } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    loginEmail: string,
    loginPass: string,
    forcedRole?: string,
  ) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetchClient("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: loginEmail,
          password: loginPass,
        }),
      });

      const token = res?.data?.accessToken || res?.token || "demo-token";
      const userRole = forcedRole || res?.data?.role || "CANDIDATE";

      document.cookie = `token=${token}; path=/; max-age=86400`;
      document.cookie = `role=${userRole}; path=/; max-age=86400`;

      if (userRole === "SUPER_ADMIN" || userRole === "ADMIN") {
        router.push("/admin");
      } else if (userRole === "RECRUITER") {
        router.push("/recruiter");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please check credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50/60 p-4 antialiased text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="w-full max-w-[420px] bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-900 text-white mb-3 shadow-sm font-semibold tracking-wider text-base">
            DEV
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Welcome back
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            Sign in to access your assessment dashboard
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200/60 text-red-600 text-xs flex items-center gap-2">
            <span className="font-semibold text-sm">✕</span>
            <span>{error}</span>
          </div>
        )}

        {/* Regular Login Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-zinc-700 mb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-3.5 py-2 text-sm bg-white border border-zinc-200 rounded-xl placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-zinc-700"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2 text-sm bg-white border border-zinc-200 rounded-xl placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Authenticating..." : "Sign in to account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200/80" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
            <span className="bg-white px-3 text-zinc-400 font-medium">
              or quick access
            </span>
          </div>
        </div>

        {/* One-Click Demo Login Section */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            {/* Demo Admin */}
            <button
              type="button"
              onClick={() =>
                handleLogin("admin@assessment.com", "password123", "ADMIN")
              }
              className="group p-3 bg-zinc-50/60 hover:bg-zinc-50 border border-zinc-200/70 hover:border-zinc-300 rounded-xl text-left transition flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold text-zinc-800">Admin</span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              </div>
              <span className="text-[11px] text-zinc-400 group-hover:text-zinc-700 font-medium mt-1">
                Demo Login →
              </span>
            </button>

            {/* Demo Candidate */}
            <button
              type="button"
              onClick={() =>
                handleLogin(
                  "candidate.test@dev.com",
                  "password123",
                  "CANDIDATE",
                )
              }
              className="group p-3 bg-zinc-50/60 hover:bg-zinc-50 border border-zinc-200/70 hover:border-zinc-300 rounded-xl text-left transition flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold text-zinc-800">
                  Candidate
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[11px] text-zinc-400 group-hover:text-zinc-700 font-medium mt-1">
                Demo Login →
              </span>
            </button>
          </div>

          {/* Demo Recruiter */}
          <button
            type="button"
            onClick={() =>
              handleLogin("recruiter@techcorp.com", "password123", "RECRUITER")
            }
            className="group w-full p-3 bg-zinc-50/60 hover:bg-zinc-50 border border-zinc-200/70 hover:border-zinc-300 rounded-xl transition flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span className="text-xs font-semibold text-zinc-800">
                Recruiter
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 group-hover:text-zinc-700 font-medium">
              Demo Login →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}