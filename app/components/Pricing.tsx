"use client";

import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$499",
      description: "Perfect for small businesses starting with AI automation.",
      features: [
        "Basic AI chatbot",
        "Simple workflow automation",
        "Email support",
        "1 integration",
      ],
    },
    {
      name: "Growth",
      price: "$999",
      description: "Best for growing businesses that need full automation.",
      features: [
        "Advanced AI chatbot",
        "Multi-step automation",
        "CRM integration",
        "Priority support",
        "3 integrations",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large companies needing fully custom AI systems.",
      features: [
        "Custom AI agents",
        "Full business automation",
        "Dedicated support",
        "Unlimited integrations",
        "On-site consultation",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-black relative">
      
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Simple{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Pricing
            </span>
          </h2>
          <p className="text-gray-400 mt-4">
            Transparent pricing for businesses of all sizes.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border transition relative ${
                plan.highlighted
                  ? "border-cyan-500 bg-white/10 scale-105"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {/* Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Title */}
              <h3 className="text-white text-xl font-semibold">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="text-3xl font-bold text-white mt-4">
                {plan.price}
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mt-2">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-cyan-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:opacity-90 transition">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}