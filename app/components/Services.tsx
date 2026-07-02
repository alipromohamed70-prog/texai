"use client";

export default function Services() {
  const services = [
    {
      title: "AI Chatbots",
      description:
        "Intelligent chatbots that handle customer support and increase conversions 24/7.",
    },
    {
      title: "Workflow Automation",
      description:
        "Automate repetitive business tasks and save hundreds of hours every month.",
    },
    {
      title: "AI Agents",
      description:
        "Custom AI agents that perform complex business operations automatically.",
    },
    {
      title: "CRM Integration",
      description:
        "Connect your tools and automate customer data management seamlessly.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-black relative">
      
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Services
            </span>
          </h2>
          <p className="text-gray-400 mt-4">
            We build powerful AI systems that automate and scale your business.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="
                p-6 rounded-2xl border border-white/10 bg-white/5
                hover:bg-white/10 hover:-translate-y-1
                hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
                transition-all duration-300
              "
            >
              <h3 className="text-white font-semibold text-lg mb-3">
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}