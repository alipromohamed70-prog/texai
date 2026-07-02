"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التعديل هنا: استخدام setLoading بدلاً من loading
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/mzdljorg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSuccess(
          "✅ Your message has been sent successfully! We'll get back to you within 24 hours."
        );

        setForm({
          name: "",
          email: "",
          company: "",
          service: "",
          message: "",
        });
      } else {
        setError("❌ Something went wrong. Please try again.");
      }
    } catch {
      setError("❌ Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* Left Side */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Contact TEXAI
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight">
            Let's Build Your
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI Automation System
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-8">
            Tell us about your business and your goals.
            We'll review your project and get back to you
            within 24 hours.
          </p>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-white font-semibold">
                Free Consultation
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                Discuss your automation ideas with no obligation.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-white font-semibold">
                Response Time
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                Usually within 24 hours.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-white font-semibold">
                Services
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                AI Agents • Automation • Chatbots • Integrations
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6"
        >
          <div>
            <label className="text-white text-sm">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none focus:border-cyan-400"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Business Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none focus:border-cyan-400"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none focus:border-cyan-400"
              placeholder="Company Name"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Service Needed
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none focus:border-cyan-400"
            >
              <option value="">Select a Service</option>
              <option>AI Agent</option>
              <option>AI Chatbot</option>
              <option>Workflow Automation</option>
              <option>CRM Integration</option>
              <option>Custom AI Solution</option>
            </select>
          </div>

          <div>
            <label className="text-white text-sm">
              Project Details
            </label>
            <textarea
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none focus:border-cyan-400"
              placeholder="Tell us about your project..."
            />
          </div>

          {success && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-400 text-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

      </div>
    </section>
  );
}