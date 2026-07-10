"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock3, Mail, LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Lightweight i18n — mirrors the pattern used across the other sections    */
/* -------------------------------------------------------------------------- */

type Lang = "ar" | "en" | "fr";

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  if (nav === "ar" || nav === "fr") return nav;
  return "en";
}

interface InfoRow {
  icon: LucideIcon;
  label: string;
  lines: string[];
}

const dict: Record<Lang, { dir: "rtl" | "ltr"; title: string; rows: InfoRow[] }> = {
  ar: {
    dir: "rtl",
    title: "معلومات العيادة",
    rows: [
      { icon: MapPin, label: "العنوان", lines: ["123 Dental Street", "New York, NY 10001"] },
      { icon: Phone, label: "الهاتف", lines: ["+1 (555) 123-4567"] },
      { icon: Mail, label: "البريد الإلكتروني", lines: ["contact@brightsmile.com"] },
      { icon: Clock3, label: "ساعات العمل", lines: ["الإثنين - الجمعة: 9:00 ص - 6:00 م", "السبت: 9:00 ص - 2:00 م", "الأحد: مغلق"] },
    ],
  },
  en: {
    dir: "ltr",
    title: "Clinic Information",
    rows: [
      { icon: MapPin, label: "Address", lines: ["123 Dental Street", "New York, NY 10001"] },
      { icon: Phone, label: "Phone", lines: ["+1 (555) 123-4567"] },
      { icon: Mail, label: "Email", lines: ["contact@brightsmile.com"] },
      { icon: Clock3, label: "Working Hours", lines: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM", "Sunday: Closed"] },
    ],
  },
  fr: {
    dir: "ltr",
    title: "Informations sur la clinique",
    rows: [
      { icon: MapPin, label: "Adresse", lines: ["123 Dental Street", "New York, NY 10001"] },
      { icon: Phone, label: "Téléphone", lines: ["+1 (555) 123-4567"] },
      { icon: Mail, label: "E-mail", lines: ["contact@brightsmile.com"] },
      { icon: Clock3, label: "Horaires", lines: ["Lundi - Vendredi : 9h00 - 18h00", "Samedi : 9h00 - 14h00", "Dimanche : Fermé"] },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*  Main component                                                           */
/* -------------------------------------------------------------------------- */

export default function ClinicInfo() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => setLang(detectLang()), []);
  const t = dict[lang];
  const isRTL = t.dir === "rtl";

  return (
    <motion.div
      dir={isRTL ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative h-fit rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
    >
      <h2 className="mb-6 font-serif text-2xl text-neutral-50">{t.title}</h2>

      <div className="space-y-2">
        {t.rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group flex gap-4 rounded-xl px-3 py-3 transition-colors duration-300 hover:bg-emerald-400/[0.05]"
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
              <row.icon size={20} />
            </span>
            <div>
              <h3 className="font-semibold text-neutral-100">{row.label}</h3>
              <div className="text-sm leading-6 text-neutral-300">
                {row.lines.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
