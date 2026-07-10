"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, CalendarCheck2, Clock3, ShieldCheck, LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Lightweight i18n — mirrors the pattern used in Hero.tsx / BookingForm.tsx */
/* -------------------------------------------------------------------------- */

type Lang = "ar" | "en" | "fr";

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  if (nav === "ar" || nav === "fr") return nav;
  return "en";
}

interface FeatureContent {
  icon: LucideIcon;
  title: string;
  description: string;
}

const dict: Record<Lang, { dir: "rtl" | "ltr"; eyebrow: string; title: string; features: FeatureContent[] }> = {
  ar: {
    dir: "rtl",
    eyebrow: "لماذا هذا النظام",
    title: "تقنية تجعل الحجز أسهل وأكثر أماناً",
    features: [
      { icon: Brain, title: "أتمتة بالذكاء الاصطناعي", description: "تتم معالجة طلبات الحجز تلقائياً عبر مسارات عمل مدعومة بالذكاء الاصطناعي." },
      { icon: CalendarCheck2, title: "مزامنة مع Google Calendar", description: "تتم مزامنة المواعيد المتاحة مباشرة مع تقويم Google." },
      { icon: Clock3, title: "جدولة فورية", description: "يمكن للمرضى حجز موعد في أقل من دقيقة واحدة." },
      { icon: ShieldCheck, title: "حماية كاملة للبيانات", description: "تتم معالجة بيانات المريض بأمان طوال عملية الحجز." },
    ],
  },
  en: {
    dir: "ltr",
    eyebrow: "Why this system",
    title: "Technology that makes booking easier and safer",
    features: [
      { icon: Brain, title: "AI Automation", description: "Appointment requests are processed automatically using AI workflows." },
      { icon: CalendarCheck2, title: "Google Calendar Sync", description: "Available appointments are synchronized with Google Calendar in real time." },
      { icon: Clock3, title: "Instant Scheduling", description: "Patients can book an appointment in less than one minute." },
      { icon: ShieldCheck, title: "Secure Data", description: "Patient information is handled securely throughout the booking process." },
    ],
  },
  fr: {
    dir: "ltr",
    eyebrow: "Pourquoi ce système",
    title: "Une technologie qui rend la réservation plus simple et plus sûre",
    features: [
      { icon: Brain, title: "Automatisation IA", description: "Les demandes de rendez-vous sont traitées automatiquement via des workflows IA." },
      { icon: CalendarCheck2, title: "Synchronisation Google Calendar", description: "Les créneaux disponibles sont synchronisés en temps réel avec Google Calendar." },
      { icon: Clock3, title: "Planification instantanée", description: "Les patients peuvent réserver un rendez-vous en moins d'une minute." },
      { icon: ShieldCheck, title: "Données sécurisées", description: "Les informations des patients sont traitées en toute sécurité." },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*  Main component                                                           */
/* -------------------------------------------------------------------------- */

export default function Features() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => setLang(detectLang()), []);
  const t = dict[lang];
  const isRTL = t.dir === "rtl";

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="relative py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-10 max-w-xl text-center"
      >
        <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs font-medium tracking-wide text-emerald-300">
          {t.eyebrow}
        </span>
        <h2 className="mt-4 font-serif text-2xl text-neutral-50 sm:text-3xl">{t.title}</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {t.features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl p-[1px] transition-all duration-300 hover:bg-gradient-to-br hover:from-emerald-400/40 hover:via-emerald-400/10 hover:to-transparent"
            >
              <div className="relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 group-hover:border-transparent group-hover:shadow-[0_12px_40px_-10px_rgba(16,185,129,0.35)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-400/15">
                  <Icon className="text-emerald-400 transition-transform duration-300 group-hover:rotate-6" size={22} />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-neutral-50">{feature.title}</h3>
                <p className="text-sm leading-6 text-neutral-300">{feature.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
