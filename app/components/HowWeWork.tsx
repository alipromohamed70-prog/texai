"use client";

import { motion } from "framer-motion";

export default function HowWeWork() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We analyze your business, goals, and workflows to identify the best AI automation opportunities.",
    },
    {
      number: "02",
      title: "Strategy",
      description:
        "We design a customized AI roadmap that fits your business processes and objectives.",
    },
    {
      number: "03",
      title: "Development",
      description:
        "Our team builds intelligent AI agents, automations, and integrations tailored to your needs.",
    },
    {
      number: "04",
      title: "Deployment",
      description:
        "We launch, monitor, optimize, and continuously improve your AI system for long-term success.",
    },
  ];

  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            How We{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Work
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Our proven process ensures every AI automation project is delivered
            efficiently, strategically, and with measurable business impact.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xl font-bold text-white">
                {step.number}
              </div>

              <h3 className="mb-3 text-xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="leading-7 text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}