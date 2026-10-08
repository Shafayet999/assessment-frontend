// src/app/dashboard/layout.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function CandidateLayout({
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
        { name: "Overview", href: "/dashboard" },
        { name: "My Assessments", href: "/dashboard/assessments" },
        { name: "Results & Scores", href: "/dashboard/results" },
    ];

    return (
        <div className="min-h-screen flex bg-zinc-50/60 text-zinc-900 antialiased">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-200/80 bg-white flex flex-col justify-between p-5">
                <div className="space-y-6">
                    <div className="flex items-center gap-2.5 px-2">
                        <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
                            DP
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-tight">
                                DevPlatform
                            </p>
                            <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">
                                Candidate Portal
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

                {/* User Info & Logout */}
                <div className="border-t border-zinc-200/70 pt-4 px-2 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-zinc-800">
                            Candidate Demo
                        </p>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200/60 mt-0.5">
                            CANDIDATE
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

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                <header className="h-16 border-b border-zinc-200/80 bg-white px-8 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-800">
                        Assessment Dashboard
                    </h2>
                    <span className="text-xs text-zinc-400">
                        Live Backend Connected
                    </span>
                </header>

                <div className="p-8 max-w-6xl w-full mx-auto">{children}</div>
            </main>
        </div>
    );
}
