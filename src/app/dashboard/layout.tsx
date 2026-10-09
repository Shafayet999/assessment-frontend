// src/app/dashboard/layout.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
  { name: "My Assessments", href: "/dashboard" },
  { name: "My Results", href: "/dashboard/results" },
];

function CandidateNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive =
          mounted &&
          (pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href)));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 text-xs font-medium rounded-xl transition ${
              isActive
                ? "bg-zinc-900 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-50/60 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200/80 bg-white p-6 flex flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              CD
            </div>
            <div>
              <h2 className="text-xs font-semibold text-zinc-900">
                Candidate Portal
              </h2>
              <p className="text-[10px] text-zinc-400">Skill Evaluation</p>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="h-20 bg-zinc-100 rounded-xl animate-pulse" />
            }
          >
            <CandidateNav />
          </Suspense>
        </div>

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-zinc-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-zinc-900">Jane Candidate</p>
              <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded font-medium">
                CANDIDATE
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl font-medium transition cursor-pointer text-left px-2"
          >
            Logout →
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl mx-auto overflow-y-auto">
        <Suspense
          fallback={
            <div className="h-64 bg-zinc-100 rounded-2xl animate-pulse" />
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
}