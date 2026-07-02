export default function Trusted() {
  return (
    <section className="bg-[#050505] py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <p className="mb-10 text-center text-sm uppercase tracking-[0.3em] text-gray-500">
          Powered By Modern AI Technologies
        </p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-6">

          <div className="rounded-2xl border border-gray-800 bg-zinc-900 p-6 text-center text-lg font-semibold">
            OpenAI
          </div>

          <div className="rounded-2xl border border-gray-800 bg-zinc-900 p-6 text-center text-lg font-semibold">
            n8n
          </div>

          <div className="rounded-2xl border border-gray-800 bg-zinc-900 p-6 text-center text-lg font-semibold">
            WhatsApp
          </div>

          <div className="rounded-2xl border border-gray-800 bg-zinc-900 p-6 text-center text-lg font-semibold">
            Google
          </div>

          <div className="rounded-2xl border border-gray-800 bg-zinc-900 p-6 text-center text-lg font-semibold">
            Stripe
          </div>

          <div className="rounded-2xl border border-gray-800 bg-zinc-900 p-6 text-center text-lg font-semibold">
            Zapier
          </div>

        </div>

      </div>
    </section>
  );
}