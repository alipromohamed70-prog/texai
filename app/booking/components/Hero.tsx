"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ShieldCheck, Sparkles, Star } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Lightweight i18n — mirrors the pattern used in BookingForm.tsx            */
/* -------------------------------------------------------------------------- */

type Lang = "ar" | "en" | "fr";

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  if (nav === "ar" || nav === "fr") return nav;
  return "en";
}

const dict = {
  ar: {
    dir: "rtl",
    eyebrow: "حجز مواعيد مدعوم بالذكاء الاصطناعي",
    titleLine1: "ابتسامة مشرقة",
    titleLine2: "عيادة الأسنان",
    subtitle:
      "جرّب نظام حجز مواعيد أسنان ذكياً مبنياً على Next.js وn8n وGoogle Calendar، يتحقق تلقائياً من توفر المواعيد ويجدول زيارات المرضى.",
    features: [
      { icon: Calendar, label: "حجز مواعيد سريع عبر الإنترنت" },
      { icon: Clock, label: "توفر لحظي على التقويم" },
      { icon: ShieldCheck, label: "حماية كاملة لبيانات المريض" },
    ],
    ratingText: "تقييم ممتاز من مرضانا",
  },
  en: {
    dir: "ltr",
    eyebrow: "AI Appointment Booking Demo",
    titleLine1: "Bright Smile",
    titleLine2: "Dental Clinic",
    subtitle:
      "Experience a modern AI-powered dental appointment booking system built with Next.js, n8n and Google Calendar. This demo automatically checks appointment availability and schedules patient visits.",
    features: [
      { icon: Calendar, label: "Fast Online Appointment Booking" },
      { icon: Clock, label: "Instant Calendar Availability" },
      { icon: ShieldCheck, label: "Secure Patient Information" },
    ],
    ratingText: "Rated excellent by our patients",
  },
  fr: {
    dir: "ltr",
    eyebrow: "Démo de réservation assistée par IA",
    titleLine1: "Sourire Éclatant",
    titleLine2: "Clinique Dentaire",
    subtitle:
      "Découvrez un système de réservation dentaire intelligent basé sur Next.js, n8n et Google Calendar, qui vérifie automatiquement les disponibilités et planifie les visites des patients.",
    features: [
      { icon: Calendar, label: "Réservation rapide en ligne" },
      { icon: Clock, label: "Disponibilité instantanée" },
      { icon: ShieldCheck, label: "Données patients sécurisées" },
    ],
    ratingText: "Excellente note de nos patients",
  },
} as const;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1657470179447-0f5aa16daa91?q=80&w=1200&auto=format&fit=crop";

/* -------------------------------------------------------------------------- */
/*  Decorative pieces — same visual language as BookingForm.tsx               */
/* -------------------------------------------------------------------------- */

function ToothShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      <path d="M50,8 C32,8 17,22 17,42 C17,60 26,88 36,88 C44,88 41,68 50,68 C59,68 56,88 64,88 C74,88 83,60 83,42 C83,22 68,8 50,8 Z" />
    </svg>
  );
}

const PARTICLE_SEEDS = [
  { top: "14%", left: "22%", size: 3, dur: 10, delay: 0 },
  { top: "30%", left: "72%", size: 2, dur: 12, delay: 1 },
  { top: "60%", left: "12%", size: 2.5, dur: 14, delay: 0.5 },
  { top: "78%", left: "60%", size: 2, dur: 11, delay: 1.8 },
];

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
        animate={{ y: [0, 24, 0], x: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -14, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      {PARTICLE_SEEDS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-emerald-300/40"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                           */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => setLang(detectLang()), []);
  const t = dict[lang];
  const isRTL = t.dir === "rtl";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#050706] px-6 py-16 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6),0_0_0_1px_rgba(16,185,129,0.06)] sm:px-10 lg:py-20"
      style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.08), transparent)" }}
    >
      <FloatingOrbs />
      <ToothShape className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 text-emerald-400/[0.04] rtl:-right-auto rtl:-left-20" />

      {/* TEXAI branding badge */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto mb-10 flex w-fit items-center justify-center"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px rgba(16,185,129,0.15)",
              "0 0 22px rgba(16,185,129,0.35)",
              "0 0 0px rgba(16,185,129,0.15)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-0.5 rounded-2xl border border-emerald-400/20 bg-white/[0.04] px-5 py-2.5 text-center backdrop-blur-xl sm:flex-row sm:gap-2.5"
        >
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by TEXAI Agency
          </span>
          <span className="hidden text-white/20 sm:inline">•</span>
          <span className="text-[11px] text-neutral-400">Founded &amp; Managed by Oussama Elhablaoui</span>
        </motion.div>
      </motion.div>

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        {/* Left / copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs font-medium tracking-wide text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            {t.eyebrow}
          </span>

          <h1 className="font-serif text-4xl leading-tight text-neutral-50 sm:text-5xl">
            {t.titleLine1}
            <br />
            {t.titleLine2}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-300">{t.subtitle}</p>

          <div className="mt-8 grid gap-4">
            {t.features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition hover:border-emerald-400/20 hover:bg-emerald-400/[0.04]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm text-neutral-200">{f.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right / image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-md rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          >
            <img
              src={HERO_IMAGE}
              alt="Professional dentist caring for a patient in a modern clinic"
              loading="lazy"
              className="h-[380px] w-full rounded-[1.5rem] object-cover"
            />

            {/* Floating rating card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -left-5 top-6 rounded-2xl border border-white/10 bg-[#081713]/90 p-3 shadow-xl backdrop-blur-md rtl:-left-auto rtl:-right-5"
            >
              <div className="flex items-center gap-1 text-emerald-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-[11px] text-neutral-300">{t.ratingText}</p>
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="absolute -bottom-5 -right-5 rounded-2xl border border-white/10 bg-[#081713]/90 p-4 shadow-xl backdrop-blur-md rtl:-right-auto rtl:-left-5"
            >
              <p className="font-serif text-xl text-neutral-50">1000+</p>
              <p className="text-[11px] text-neutral-300">Happy Patients</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
