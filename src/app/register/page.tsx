"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { fetchClient } from "@/lib/api";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .max(60, { message: "Name cannot exceed 60 characters." }),
    email: z
      .string()
      .min(1, { message: "Email address is required." })
      .email({ message: "Please provide a valid email address." }),
    role: z.enum(["CANDIDATE", "RECRUITER"], {
      errorMap: () => ({ message: "Please select an account type." }),
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "CANDIDATE",
      password: "",
      confirmPassword: "",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const payload = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        role: data.role,
      };

      await fetchClient("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Registration failed. Please verify your details and try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
            DA
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-900">
            DevAssess
          </span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
          Create your account
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Join thousands of developers and engineering recruiters
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {serverError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center justify-between">
              <span>{serverError}</span>
              <button
                type="button"
                onClick={() => setServerError("")}
                className="text-xs font-bold text-rose-800 ml-2"
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center justify-between">
              <span>{successMessage}</span>
              <span className="text-[11px] font-medium text-emerald-600 animate-pulse">
                Redirecting...
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/* Account Role Selector */}
            <div className="space-y-1.5">
              <span className="block text-xs font-semibold text-zinc-800">
                I want to join as:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <label
                  htmlFor="role-candidate"
                  className={`border rounded-xl p-3 flex flex-col cursor-pointer transition text-left ${
                    selectedRole === "CANDIDATE"
                      ? "border-zinc-900 bg-zinc-50/80 ring-1 ring-zinc-900"
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <input
                    id="role-candidate"
                    type="radio"
                    value="CANDIDATE"
                    {...register("role")}
                    className="sr-only"
                  />
                  <span className="text-xs font-semibold text-zinc-900">Candidate</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">Take screening tests</span>
                </label>

                <label
                  htmlFor="role-recruiter"
                  className={`border rounded-xl p-3 flex flex-col cursor-pointer transition text-left ${
                    selectedRole === "RECRUITER"
                      ? "border-zinc-900 bg-zinc-50/80 ring-1 ring-zinc-900"
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <input
                    id="role-recruiter"
                    type="radio"
                    value="RECRUITER"
                    {...register("role")}
                    className="sr-only"
                  />
                  <span className="text-xs font-semibold text-zinc-900">Recruiter</span>
                  <span className="text-[10px] text-zinc-500 mt-0.5">Create & assess tests</span>
                </label>
              </div>
              {errors.role && (
                <p className="text-[11px] text-rose-600 font-medium mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-semibold text-zinc-800">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                placeholder="e.g. John Doe"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-zinc-50/50 transition focus:outline-none focus:bg-white ${
                  errors.name
                    ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                    : "border-zinc-200 focus:border-zinc-900"
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-600 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-zinc-800">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="developer@example.com"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-zinc-50/50 transition focus:outline-none focus:bg-white ${
                  errors.email
                    ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                    : "border-zinc-200 focus:border-zinc-900"
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-600 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold text-zinc-800">
                Password <span className="text-rose-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="At least 6 characters"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-zinc-50/50 transition focus:outline-none focus:bg-white ${
                  errors.password
                    ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                    : "border-zinc-200 focus:border-zinc-900"
                }`}
              />
              {errors.password && (
                <p className="text-[11px] text-rose-600 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-xs font-semibold text-zinc-800">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="Re-enter your password"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-zinc-50/50 transition focus:outline-none focus:bg-white ${
                  errors.confirmPassword
                    ? "border-rose-400 focus:ring-2 focus:ring-rose-200"
                    : "border-zinc-200 focus:border-zinc-900"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-[11px] text-rose-600 font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-xl shadow-sm transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Creating account..." : "Sign Up →"}
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-100 text-center">
            <p className="text-xs text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-zinc-900 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}