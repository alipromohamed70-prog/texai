import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChoose from "./components/WhyChoose";
import HowWeWork from "./components/HowWeWork";
import Industries from "./components/Industries";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />

      <div className="space-y-0">
        <div className="pt-10"><Services /></div>
        <div className="pt-10"><WhyChoose /></div>
        <div className="pt-10"><HowWeWork /></div>
        <div className="pt-10"><Industries /></div>
        <div className="pt-10"><Testimonials /></div>
        <div className="pt-10"><Pricing /></div>
        <div className="pt-10"><FAQ /></div>
        <div className="pt-10"><CTA /></div>
      </div>
    </main>
  );
}