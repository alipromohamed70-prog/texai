import Hero from "./components/Hero";
import Features from "./components/Features";
import BookingForm from "./components/BookingForm";
import ClinicInfo from "./components/ClinicInfo";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        <Hero />

        <Features />

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          <div className="lg:col-span-2">
            <BookingForm />
          </div>

          <div>
            <ClinicInfo />
          </div>

        </div>

      </div>
    </main>
  );
}