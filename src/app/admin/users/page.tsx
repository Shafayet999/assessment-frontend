// src/app/admin/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchClient } from "@/lib/api";

interface UserItem {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const loadUsers = async () => {
        try {
            const res = await fetchClient("/admin/users");
            setUsers(res?.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function loadUsers() {
            try {
                const res = await fetchClient("/admin/users");
                setUsers(res?.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, []);

    const toggleStatus = async (user: UserItem) => {
        const newStatus = user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        setUpdatingId(user.id);
        try {
            await fetchClient(`/admin/users/${user.id}`, {
                method: "PATCH",
                body: JSON.stringify({ status: newStatus }),
            });
            // লোকাল স্টেট আপডেট
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === user.id ? { ...u, status: newStatus } : u,
                ),
            );
        } catch (err: any) {
            alert(err?.message || "Failed to update user status");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="space-y-6 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
                        User Directory & Access Control
                    </h1>
                    <p className="text-xs text-zinc-500 mt-0.5">
                        Inspect all registered accounts, moderate roles, and
                        toggle access states
                    </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-zinc-100 rounded-lg text-zinc-700">
                    Total: {users.length} Users
                </span>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-12 bg-zinc-100 rounded-xl animate-pulse"
                            />
                        ))}
                    </div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center text-xs text-zinc-500">
                        No registered users found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-zinc-500 font-medium">
                                    <th className="p-4">User</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {users.map((u) => (
                                    <tr
                                        key={u.id}
                                        className="hover:bg-zinc-50/50 transition"
                                    >
                                        <td className="p-4 font-semibold text-zinc-800">
                                            {u.name || "Unnamed User"}
                                        </td>
                                        <td className="p-4 text-zinc-500">
                                            {u.email}
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-zinc-50 border-zinc-200 text-zinc-700">
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                                    u.status === "ACTIVE"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                        : "bg-red-50 text-red-700 border-red-200"
                                                }`}
                                            >
                                                {u.status || "ACTIVE"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                type="button"
                                                disabled={updatingId === u.id}
                                                onClick={() => toggleStatus(u)}
                                                className="px-3 py-1.5 border border-zinc-200 hover:bg-zinc-100 rounded-lg text-[11px] font-medium transition cursor-pointer disabled:opacity-50"
                                            >
                                                {updatingId === u.id
                                                    ? "Saving..."
                                                    : u.status === "ACTIVE"
                                                      ? "Block Account"
                                                      : "Activate"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
