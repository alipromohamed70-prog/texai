import {
  Brain,
  CalendarCheck2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Automation",
    description:
      "Appointment requests are processed automatically using AI workflows.",
  },
  {
    icon: CalendarCheck2,
    title: "Google Calendar",
    description:
      "Available appointments are synchronized with Google Calendar.",
  },
  {
    icon: Clock3,
    title: "Instant Scheduling",
    description:
      "Patients can book an appointment in less than one minute.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Data",
    description:
      "Patient information is handled securely throughout the booking process.",
  },
];

export default function Features() {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Icon className="text-blue-600" size={24} />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>

            <p className="text-gray-600 text-sm leading-6">
              {feature.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}