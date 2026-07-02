"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is TEXAI?",
      answer:
        "TEXAI is an AI automation agency that builds intelligent systems to help businesses automate workflows, save time, and increase revenue.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We build AI agents, chatbots, automation systems, and custom AI solutions tailored to your business needs.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Depending on complexity, most AI automation projects take between 1 to 4 weeks to complete.",
    },
    {
      question: "Do you work with small businesses?",
      answer:
        "Yes, we work with startups, small businesses, and large companies looking to scale using AI automation.",
    },
    {
      question: "How can I get started?",
      answer:
        "You can contact us through the contact page to schedule a free consultation and discuss your project.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-black relative">
      
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Questions
            </span>
          </h2>
          <p className="text-gray-400 mt-4">
            Everything you need to know about working with TEXAI.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl bg-white/5 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="text-white font-medium">
                  {faq.question}
                </span>

                <span className="text-white text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}