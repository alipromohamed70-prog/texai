import Hero from "./components/Hero";
import Features from "./components/Features";
import BookingForm from "./components/BookingForm";
import ClinicInfo from "./components/ClinicInfo";

export default function BookingPage() {
  return (
    <main
      className="min-h-screen bg-[#030504] px-4 py-10 sm:py-14"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.06), transparent)",
      }}
    >
      <div className="mx-auto max-w-7xl space-y-14">
        <Hero />

        <Features />

        <div className="grid gap-8 lg:grid-cols-3">
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
