"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
          Ready to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Automate Your Business
          </span>{" "}
          with AI?
        </h2>

        <p className="mt-6 text-lg text-gray-400">
          Let’s build powerful AI systems that save you time, reduce costs, and
          increase revenue.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="
              rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600
              px-8 py-3 font-semibold text-white
              transition-all duration-300 hover:scale-[1.03] hover:opacity-90
            "
          >
            Get Free Consultation
          </Link>

          <Link
            href="#services"
            className="
              rounded-lg border border-white/20
              px-8 py-3 font-semibold text-white
              transition-all duration-300 hover:bg-white/10
            "
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}