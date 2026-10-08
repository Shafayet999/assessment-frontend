// src/app/recruiter/layout.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    router.push("/login");
  };

  const navItems = [
    { name: "Recruiter Overview", href: "/recruiter" },
    { name: "Create Assessment", href: "/recruiter/assessments/create" },
    { name: "Candidate Pipeline", href: "/recruiter/candidates" },
  ];

  return (
    <div className="min-h-screen flex bg-zinc-50/60 text-zinc-900 antialiased">
      {/* Recruiter Sidebar */}
      <aside className="w-64 border-r border-zinc-200/80 bg-white flex flex-col justify-between p-5 shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
              RC
            </div>
            <div>
              <p className="text-xs font-semibold tracking-tight">Hiring Console</p>
              <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                Recruiter Portal
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-xs font-medium rounded-xl transition ${
                    active
                      ? "bg-zinc-900 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/70"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Recruiter Footer & Logout */}
        <div className="border-t border-zinc-200/70 pt-4 px-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-800">Recruiter Demo</p>
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60 mt-0.5">
              RECRUITER
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs font-medium text-zinc-400 hover:text-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Recruiter Canvas */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-zinc-200/80 bg-white px-8 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-800">Talent Assessment & Benchmarking</h2>
          <Link
            href="/recruiter/assessments/create"
            className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium transition cursor-pointer"
          >
            + New Assessment
          </Link>
        </header>

        <div className="p-8 max-w-6xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}