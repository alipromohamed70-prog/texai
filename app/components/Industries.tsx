"use client";

export default function Industries() {
  const industries = [
    {
      title: "E-commerce",
      description:
        "Automate customer support, orders, and marketing workflows.",
    },
    {
      title: "Real Estate",
      description:
        "AI systems for lead generation and client management.",
    },
    {
      title: "Healthcare",
      description:
        "Streamline appointments, communication, and patient workflows.",
    },
    {
      title: "Finance",
      description:
        "Automate reporting, data processing, and client onboarding.",
    },
    {
      title: "Education",
      description:
        "AI assistants for learning platforms and student support.",
    },
    {
      title: "Logistics",
      description:
        "Optimize operations, tracking, and supply chain automation.",
    },
  ];

  return (
    <section id="industries" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Industries We{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Serve
            </span>
          </h2>

          <p className="text-gray-400 mt-4">
            We build AI automation systems for multiple industries worldwide.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item, index) => (
            <div
              key={index}
              className="
                p-6 rounded-2xl border border-white/10 bg-white/5
                hover:bg-white/10 hover:-translate-y-1
                hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
                transition-all duration-300
              "
            >
              <h3 className="text-white font-semibold text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}