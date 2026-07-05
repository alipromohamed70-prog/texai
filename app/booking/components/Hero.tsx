import { Calendar, Clock, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-3xl p-10 mb-10">
      <div className="grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <div>

          <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
            AI Appointment Booking Demo
          </span>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Bright Smile
            <br />
            Dental Clinic
          </h1>

          <p className="text-blue-100 text-lg leading-8 mb-8">
            Experience a modern AI-powered dental appointment booking
            system built with Next.js, n8n and Google Calendar.
            This demo automatically checks appointment availability
            and schedules patient visits.
          </p>

          <div className="grid gap-4">

            <div className="flex items-center gap-3">
              <Calendar size={22} />
              <span>Fast Online Appointment Booking</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock size={22} />
              <span>Instant Calendar Availability</span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck size={22} />
              <span>Secure Patient Information</span>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex justify-center">

          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">

            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700"
              alt="Dentist"
              className="rounded-2xl w-full h-[380px] object-cover"
            />

          </div>

        </div>

      </div>
    </section>
  );
}