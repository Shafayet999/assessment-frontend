// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 py-16 px-6 antialiased selection:bg-zinc-900 selection:text-white flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition">
            ← Back to Home
          </Link>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Get in Touch
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              Talk with our platform team
            </h1>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Have questions regarding custom assessment design, enterprise hiring plans, or integration APIs? Send us a message and our team will get back to you.
            </p>

            <div className="pt-6 space-y-3 text-xs text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-800">Support:</span>
                <span>support@devplatform.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-800">Hiring Partners:</span>
                <span>enterprise@devplatform.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-800">Response Window:</span>
                <span>Under 12 business hours</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm">
            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mx-auto">
                  ✓
                </div>
                <h3 className="text-sm font-semibold text-zinc-900">Message Received</h3>
                <p className="text-xs text-zinc-500">
                  Thank you for reaching out. A representative will contact you via {formData.email}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-medium text-zinc-900 underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-700 mb-1">
                    Work Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-700 mb-1">
                    Inquiry Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Custom Technical Assessment Inquiry"
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your assessment or platform requirements..."
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium shadow-sm transition active:scale-[0.99] cursor-pointer"
                >
                  Send Inquiry Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full pt-16 text-center text-xs text-zinc-400">
        © 2026 DevPlatform Systems.
      </div>
    </div>
  );
}