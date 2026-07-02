"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const projects = [
    {
      title: "AI Receptionist",
      industry: "Dental Clinics",
      result: "Automates appointment booking, answers FAQs, and responds to patients 24/7.",
    },
    {
      title: "Lead Generation Agent",
      industry: "Real Estate",
      result: "Captures, qualifies, and follows up with potential buyers automatically.",
    },
    {
      title: "Customer Support Automation",
      industry: "E-commerce",
      result: "Handles customer inquiries instantly and reduces support workload using AI.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI Solutions
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Examples of intelligent automation systems that TEXAI can build for
            businesses across different industries.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]"
            >
              <div className="mb-5 inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300">
                {project.industry}
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-white">
                {project.title}
              </h3>

              <p className="leading-7 text-gray-400">
                {project.result}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}