// src/lib/api.ts

// সরাসরি ব্যাকএন্ডের সম্পূর্ণ লাইভ বেস URL
const BACKEND_BASE_URL = "https://coding-platform-henna.vercel.app/api/v1";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export async function fetchClient(endpoint: string, options: RequestInit = {}) {
  const token =
    getCookie("token") ||
    (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token && token !== "demo-token") {
    headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  }

  // সম্পূর্ণ ব্যাকএন্ড URL তৈরি করা
  const fullUrl = `${BACKEND_BASE_URL}${endpoint}`;
  const method = options.method || "GET";

  // 🔍 ব্রাউজার কনসোলে পোস্টম্যানের জন্য রেডি করা সম্পূর্ণ তথ্য প্রিন্ট হবে
  console.group(`🎯 [API Call]: ${method} ${endpoint}`);
  console.log(`🔗 Full Postman URL: %c${fullUrl}`, "color: #3b82f6; font-weight: bold;");
  if (options.body) {
    console.log("📦 Request Payload (Body):", JSON.parse(options.body as string));
  }
  if (headers["Authorization"]) {
    console.log("🔑 Auth Token (Bearer):", headers["Authorization"]);
  }
  console.groupEnd();

  // সরাসরি Vercel ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || "Failed to process request");
  }

  return data;
}