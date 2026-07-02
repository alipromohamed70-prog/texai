import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-white text-xl font-bold">
              TEXAI
            </h2>
            <p className="text-gray-400 text-sm mt-4">
              We build AI automation systems that help businesses scale faster and smarter.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#services" className="hover:text-cyan-400">Services</Link></li>
              <li><Link href="#pricing" className="hover:text-cyan-400">Pricing</Link></li>
              <li><Link href="#contact" className="hover:text-cyan-400">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>AI Automation</li>
              <li>AI Agents</li>
              <li>Workflow Systems</li>
              <li>CRM Integration</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>contact@texai.com</li>
              <li>+00 000 000 000</li>
              <li>Available Worldwide</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} TEXAI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}