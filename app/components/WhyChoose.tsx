"use client";

export default function WhyChoose() {
  const items = [
    {
      title: "Fast Delivery",
      description:
        "We build and deploy AI systems quickly without sacrificing quality.",
    },
    {
      title: "Business Focused",
      description:
        "Every solution is designed to increase revenue and reduce costs.",
    },
    {
      title: "Scalable Systems",
      description:
        "Our automations grow with your business and handle high demand.",
    },
    {
      title: "Proven Results",
      description:
        "We focus on real measurable business impact, not just code.",
    },
  ];

  return (
    <section id="why-choose" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              TEXAI
            </span>
          </h2>

          <p className="text-gray-400 mt-4">
            We are your AI automation partner, not just developers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
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