"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Monitor,
  MessageCircle,
  User,
  Mail,
  Phone,
  Stethoscope,
  Calendar,
  Clock,
  FileText,
  Star,
  ShieldCheck,
  Sparkles,
  ChevronDown,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                    */
/* -------------------------------------------------------------------------- */

type Lang = "ar" | "en" | "fr";
type Method = "web" | "whatsapp";
type Status = "idle" | "loading" | "success" | "error";

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

interface ServiceOption {
  id: string;
  icon: string;
}

/* -------------------------------------------------------------------------- */
/*  Config                                                                   */
/* -------------------------------------------------------------------------- */

const WHATSAPP_NUMBER = "212639961207";
const WHATSAPP_PREFILL =
  "Hello TEXAI Agency,\nI would like to know more about your AI Automation services.";
const WEBHOOK_URL = "https://proman7.app.n8n.cloud/webhook/dental-booking";

/** Treatment duration (minutes) per service — used to size the calendar event. */
const SERVICE_DURATIONS: Record<string, number> = {
  checkup: 30,
  cleaning: 45,
  whitening: 60,
  rootcanal: 90,
  implant: 60,
  emergency: 30,
};

/** Buffer reserved after every appointment (cleaning, prep, notes) — not shown to the patient. */
const BUFFER_MINUTES = 10;

const SERVICE_IDS: ServiceOption[] = [
  { id: "checkup", icon: "🩺" },
  { id: "cleaning", icon: "✨" },
  { id: "whitening", icon: "😁" },
  { id: "rootcanal", icon: "🦷" },
  { id: "implant", icon: "🔩" },
  { id: "emergency", icon: "🚨" },
];

const TIME_SLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let h = 9; h <= 20; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h !== 20) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
})();

/* -------------------------------------------------------------------------- */
/*  Translations                                                             */
/* -------------------------------------------------------------------------- */

const dict = {
  ar: {
    dir: "rtl",
    eyebrow: "عيادة الأسنان الذكية",
    title: "احجز موعدك بثقة",
    subtitle: "حجز فوري، تأكيد لحظي، وفريق طبي يهتم بابتسامتك.",
    badge1: "موثوق من +1000 مريض",
    badge2: "حجز مدعوم بالذكاء الاصطناعي",
    badge3: "تأكيد فوري",
    badge4: "متاح على مدار الساعة",
    ratingText: "تقييم ممتاز من مرضانا",
    chooseMethod: "اختر طريقة الحجز المفضلة لديك",
    methodWebsite: "الحجز عبر الموقع",
    methodWebsiteDesc: "املأ النموذج واحصل على تأكيد فوري",
    methodWhatsapp: "الحجز عبر واتساب",
    methodWhatsappDesc: "تحدث مع مساعدنا الذكي مباشرة",
    whatsappIntro: "احجز موعدك فوراً عبر محادثة واتساب مع مساعدنا الذكي، متاح ٢٤/٧ للإجابة على استفساراتك وتثبيت موعدك خلال دقائق.",
    whatsappCta: "ابدأ المحادثة الآن",
    formFullName: "الاسم الكامل",
    formEmail: "البريد الإلكتروني",
    formPhone: "رقم الهاتف",
    formService: "نوع الخدمة",
    formServicePlaceholder: "اختر الخدمة المطلوبة",
    formDate: "التاريخ المفضل",
    formTime: "الوقت المفضل",
    formTimePlaceholder: "اختر الوقت (٠٩:٠٠ - ٢٠:٠٠)",
    formNotes: "سبب الزيارة (اختياري)",
    formNotesPlaceholder: "أخبرنا بأي تفاصيل إضافية...",
    submit: "تأكيد الحجز",
    submitLoading: "جارٍ الحجز...",
    submitSuccess: "تم الحجز بنجاح!",
    successDetail: "سنرسل لك تأكيداً عبر البريد الإلكتروني قريباً.",
    errorGeneric: "تعذّر إتمام الحجز، يرجى المحاولة مرة أخرى.",
    errorRetry: "إعادة المحاولة",
    errFullName: "الرجاء إدخال اسم صحيح (حرفان على الأقل)",
    errEmail: "الرجاء إدخال بريد إلكتروني صحيح",
    errPhone: "الرجاء إدخال رقم هاتف صحيح",
    errService: "الرجاء اختيار الخدمة",
    errDate: "الرجاء اختيار تاريخ صحيح (لا يمكن اختيار تاريخ سابق)",
    errTime: "الرجاء اختيار وقت بين ٠٩:٠٠ و ٢٠:٠٠",
    services: {
      checkup: { label: "فحص عام", desc: "فحص شامل وتقييم صحة الأسنان" },
      cleaning: { label: "تنظيف الأسنان", desc: "إزالة الجير وتلميع احترافي" },
      whitening: { label: "تبييض الأسنان", desc: "ابتسامة أكثر إشراقاً وبياضاً" },
      rootcanal: { label: "علاج عصب", desc: "علاج متخصص لجذور الأسنان" },
      implant: { label: "زراعة الأسنان", desc: "حلول دائمة لتعويض الأسنان" },
      emergency: { label: "حالة طارئة", desc: "استجابة سريعة للحالات العاجلة" },
    },
  },
  en: {
    dir: "ltr",
    eyebrow: "Smart Dental Clinic",
    title: "Book your visit with confidence",
    subtitle: "Instant booking, immediate confirmation, and a team that cares about your smile.",
    badge1: "Trusted by 1000+ Patients",
    badge2: "AI Powered Booking",
    badge3: "Instant Confirmation",
    badge4: "Available 24/7",
    ratingText: "Rated excellent by our patients",
    chooseMethod: "Choose your preferred booking method",
    methodWebsite: "Book using Website",
    methodWebsiteDesc: "Fill the form and get instant confirmation",
    methodWhatsapp: "Book via WhatsApp AI Assistant",
    methodWhatsappDesc: "Chat with our AI assistant directly",
    whatsappIntro: "Book your appointment instantly through a chat with our AI assistant, available 24/7 to answer your questions and confirm your visit in minutes.",
    whatsappCta: "Start the chat now",
    formFullName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Phone Number",
    formService: "Dental Service",
    formServicePlaceholder: "Select the service you need",
    formDate: "Preferred Date",
    formTime: "Preferred Time",
    formTimePlaceholder: "Select a time (09:00 - 20:00)",
    formNotes: "Reason for Visit (optional)",
    formNotesPlaceholder: "Tell us any extra details...",
    submit: "Book Appointment",
    submitLoading: "Booking...",
    submitSuccess: "Booked successfully!",
    successDetail: "We'll send you a confirmation by email shortly.",
    errorGeneric: "We couldn't complete your booking, please try again.",
    errorRetry: "Retry",
    errFullName: "Please enter a valid name (min 2 characters)",
    errEmail: "Please enter a valid email address",
    errPhone: "Please enter a valid phone number",
    errService: "Please select a service",
    errDate: "Please choose a valid date (no past dates)",
    errTime: "Please choose a time between 09:00 and 20:00",
    services: {
      checkup: { label: "Dental Check-up", desc: "Full exam and oral health assessment" },
      cleaning: { label: "Teeth Cleaning", desc: "Plaque removal and professional polish" },
      whitening: { label: "Teeth Whitening", desc: "A brighter, whiter smile" },
      rootcanal: { label: "Root Canal", desc: "Specialized treatment for tooth roots" },
      implant: { label: "Dental Implant", desc: "Permanent tooth replacement solutions" },
      emergency: { label: "Emergency Visit", desc: "Fast response for urgent cases" },
    },
  },
  fr: {
    dir: "ltr",
    eyebrow: "Clinique Dentaire Intelligente",
    title: "Réservez votre visite en toute confiance",
    subtitle: "Réservation instantanée, confirmation immédiate, une équipe qui prend soin de votre sourire.",
    badge1: "Approuvé par 1000+ patients",
    badge2: "Réservation assistée par IA",
    badge3: "Confirmation instantanée",
    badge4: "Disponible 24/7",
    ratingText: "Excellente note de nos patients",
    chooseMethod: "Choisissez votre méthode de réservation",
    methodWebsite: "Réserver via le site",
    methodWebsiteDesc: "Remplissez le formulaire, confirmation instantanée",
    methodWhatsapp: "Réserver via WhatsApp",
    methodWhatsappDesc: "Discutez directement avec notre assistant IA",
    whatsappIntro: "Réservez votre rendez-vous instantanément via une discussion avec notre assistant IA, disponible 24/7 pour répondre à vos questions.",
    whatsappCta: "Démarrer la discussion",
    formFullName: "Nom complet",
    formEmail: "Adresse e-mail",
    formPhone: "Numéro de téléphone",
    formService: "Service dentaire",
    formServicePlaceholder: "Sélectionnez le service souhaité",
    formDate: "Date préférée",
    formTime: "Heure préférée",
    formTimePlaceholder: "Choisissez une heure (09:00 - 20:00)",
    formNotes: "Motif de la visite (optionnel)",
    formNotesPlaceholder: "Ajoutez des détails supplémentaires...",
    submit: "Confirmer le rendez-vous",
    submitLoading: "Réservation en cours...",
    submitSuccess: "Réservation réussie !",
    successDetail: "Nous vous enverrons une confirmation par e-mail sous peu.",
    errorGeneric: "Impossible de finaliser la réservation, veuillez réessayer.",
    errorRetry: "Réessayer",
    errFullName: "Veuillez entrer un nom valide (2 caractères min.)",
    errEmail: "Veuillez entrer une adresse e-mail valide",
    errPhone: "Veuillez entrer un numéro de téléphone valide",
    errService: "Veuillez sélectionner un service",
    errDate: "Veuillez choisir une date valide (pas de date passée)",
    errTime: "Veuillez choisir une heure entre 09:00 et 20:00",
    services: {
      checkup: { label: "Bilan dentaire", desc: "Examen complet et évaluation bucco-dentaire" },
      cleaning: { label: "Nettoyage dentaire", desc: "Détartrage et polissage professionnel" },
      whitening: { label: "Blanchiment dentaire", desc: "Un sourire plus lumineux" },
      rootcanal: { label: "Traitement de canal", desc: "Soin spécialisé des racines dentaires" },
      implant: { label: "Implant dentaire", desc: "Solutions durables de remplacement" },
      emergency: { label: "Urgence dentaire", desc: "Réponse rapide pour les cas urgents" },
    },
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                  */
/* -------------------------------------------------------------------------- */

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  if (nav === "ar" || nav === "fr") return nav;
  return "en";
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9]{8,15}$/;

/* -------------------------------------------------------------------------- */
/*  Decorative pieces                                                        */
/* -------------------------------------------------------------------------- */

/** Simplified molar silhouette used as the recurring dental motif. */
function ToothShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      <path d="M50,8 C32,8 17,22 17,42 C17,60 26,88 36,88 C44,88 41,68 50,68 C59,68 56,88 64,88 C74,88 83,60 83,42 C83,22 68,8 50,8 Z" />
    </svg>
  );
}

const PARTICLE_SEEDS = [
  { top: "12%", left: "18%", size: 3, dur: 9, delay: 0 },
  { top: "24%", left: "68%", size: 2, dur: 11, delay: 1.2 },
  { top: "55%", left: "8%", size: 2.5, dur: 13, delay: 0.6 },
  { top: "70%", left: "82%", size: 3, dur: 10, delay: 2 },
  { top: "40%", left: "45%", size: 2, dur: 12, delay: 0.9 },
  { top: "85%", left: "35%", size: 2.5, dur: 14, delay: 1.6 },
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
        className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#34d399]/10 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, -14, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-white/[0.03] blur-3xl"
        animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* faint drifting particles — the "alive" premium detail */}
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

function RippleButton({
  children,
  disabled,
  type = "submit",
  className = "",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button";
  className?: string;
}) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={addRipple}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/30"
          style={{ left: r.x, top: r.y, translateX: "-50%", translateY: "-50%" }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 240, height: 240, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </button>
  );
}

const CONFETTI_SEEDS = Array.from({ length: 14 }).map((_, i) => ({
  x: (Math.random() - 0.5) * 220,
  rotate: Math.random() * 360,
  delay: Math.random() * 0.15,
  color: ["#10b981", "#34d399", "#ffffff"][i % 3],
}));

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {CONFETTI_SEEDS.map((c, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-8 h-2 w-2 rounded-sm"
          style={{ backgroundColor: c.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: c.x, y: 120, opacity: 0, rotate: c.rotate }}
          transition={{ duration: 1.1, delay: c.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/** Signature success moment: a ring draws itself around the tooth mark. */
function SuccessRing({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 py-10 text-center">
      <Confetti />
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="4" />
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        </svg>
        <ToothShape className="absolute inset-0 m-auto h-10 w-10 text-emerald-400/70" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
        >
          <CheckCircle2 className="h-9 w-9 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        </motion.div>
      </div>
      <div>
        <p className="text-lg font-semibold text-neutral-50">{label}</p>
        <p className="mt-1 text-sm text-neutral-300">{detail}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                           */
/* -------------------------------------------------------------------------- */

export default function BookingForm() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => setLang(detectLang()), []);
  const t = dict[lang];
  const isRTL = t.dir === "rtl";

  const [method, setMethod] = useState<Method>("web");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serviceOpen, setServiceOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const errors = useMemo(() => {
    const e: Partial<Record<keyof BookingFormData, string>> = {};
    if (formData.fullName.trim().length < 2) e.fullName = t.errFullName;
    if (!EMAIL_RE.test(formData.email)) e.email = t.errEmail;
    if (!PHONE_RE.test(formData.phone.replace(/\s/g, ""))) e.phone = t.errPhone;
    if (!formData.service) e.service = t.errService;
    if (!formData.date || formData.date < todayISO()) e.date = t.errDate;
    if (!formData.time || !TIME_SLOTS.includes(formData.time)) e.time = t.errTime;
    return e;
  }, [formData, t]);

  const isValid = Object.keys(errors).length === 0;

  const field = (key: keyof BookingFormData, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const blur = (key: string) => setTouched((prev) => ({ ...prev, [key]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, phone: true, service: true, date: true, time: true });
    if (!isValid) return;

    setStatus("loading");
    try {
      const serviceId = selectedService?.id ?? "checkup";
      const durationMinutes = SERVICE_DURATIONS[serviceId] ?? 30;
      const startDate = new Date(`${formData.date}T${formData.time}:00`);
      const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
      const blockedUntilDate = new Date(endDate.getTime() + BUFFER_MINUTES * 60000);
      const toHHMM = (d: Date) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

      const payload = {
        ...formData,
        durationMinutes,
        endTime: toHHMM(endDate),
        bufferMinutes: BUFFER_MINUTES,
        blockedUntil: toHHMM(blockedUntilDate),
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ fullName: "", email: "", phone: "", service: "", date: "", time: "", notes: "" });
        setTouched({});
      }, 4000);
    } catch {
      setStatus("error");
    }
  };

  const selectedService = formData.service
    ? SERVICE_IDS.find((s) => t.services[s.id as keyof typeof t.services].label === formData.service)
    : undefined;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden bg-[#050706] px-4 py-16 sm:px-8 lg:py-24"
      style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.08), transparent)" }}
    >
      <FloatingOrbs />
      <ToothShape className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] text-emerald-400/[0.04] rtl:-right-auto rtl:-left-24" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* ---------------------------------------------------------------- */}
        {/* Left / Hero copy + form                                          */}
        {/* ---------------------------------------------------------------- */}
        <div>
          <div className="mb-6 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs font-medium tracking-wide text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              {t.eyebrow}
            </span>
          </div>

          <h1 className="font-serif text-4xl leading-tight text-neutral-50 sm:text-5xl">{t.title}</h1>
          <p className="mt-4 max-w-md text-base text-neutral-300">{t.subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[t.badge1, t.badge2, t.badge3, t.badge4].map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-200"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                {b}
              </span>
            ))}
          </div>

          {/* Booking method selector */}
          <div className="mt-10">
            <p className="mb-3 text-sm font-medium text-neutral-200">{t.chooseMethod}</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMethod("web")}
                className={`group rounded-2xl border p-4 text-left transition-all rtl:text-right ${
                  method === "web"
                    ? "border-emerald-400/40 bg-emerald-400/[0.07] shadow-[0_0_24px_-4px_rgba(16,185,129,0.35)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <Monitor className={`mb-2 h-5 w-5 ${method === "web" ? "text-emerald-400" : "text-neutral-400"}`} />
                <p className="text-sm font-semibold text-neutral-100">{t.methodWebsite}</p>
                <p className="mt-0.5 text-xs text-neutral-400">{t.methodWebsiteDesc}</p>
              </button>
              <button
                onClick={() => setMethod("whatsapp")}
                className={`group rounded-2xl border p-4 text-left transition-all rtl:text-right ${
                  method === "whatsapp"
                    ? "border-emerald-400/40 bg-emerald-400/[0.07] shadow-[0_0_24px_-4px_rgba(16,185,129,0.35)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <MessageCircle className={`mb-2 h-5 w-5 ${method === "whatsapp" ? "text-emerald-400" : "text-neutral-400"}`} />
                <p className="text-sm font-semibold text-neutral-100">{t.methodWhatsapp}</p>
                <p className="mt-0.5 text-xs text-neutral-400">{t.methodWhatsappDesc}</p>
              </button>
            </div>
          </div>

          {/* Panel: form or whatsapp CTA */}
          <div className="mt-6 rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6),0_0_0_1px_rgba(16,185,129,0.06)] backdrop-blur-2xl sm:p-8">
            <AnimatePresence mode="wait">
              {method === "web" ? (
                <motion.form
                  key="web"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
                >
                  {/* Full name */}
                  <FieldWrapper icon={<User className="h-4 w-4" />} label={t.formFullName} error={touched.fullName ? errors.fullName : undefined}>
                    <input
                      value={formData.fullName}
                      onChange={(e) => field("fullName", e.target.value)}
                      onBlur={() => blur("fullName")}
                      aria-label={t.formFullName}
                      className={inputClass(touched.fullName && !!errors.fullName)}
                    />
                  </FieldWrapper>

                  {/* Email + phone */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FieldWrapper icon={<Mail className="h-4 w-4" />} label={t.formEmail} error={touched.email ? errors.email : undefined}>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => field("email", e.target.value)}
                        onBlur={() => blur("email")}
                        aria-label={t.formEmail}
                        className={inputClass(touched.email && !!errors.email)}
                      />
                    </FieldWrapper>
                    <FieldWrapper icon={<Phone className="h-4 w-4" />} label={t.formPhone} error={touched.phone ? errors.phone : undefined}>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => field("phone", e.target.value)}
                        onBlur={() => blur("phone")}
                        aria-label={t.formPhone}
                        className={inputClass(touched.phone && !!errors.phone)}
                      />
                    </FieldWrapper>
                  </div>

                  {/* Service dropdown */}
                  <FieldWrapper icon={<Stethoscope className="h-4 w-4" />} label={t.formService} error={touched.service ? errors.service : undefined}>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setServiceOpen((v) => !v)}
                        onBlur={() => setTimeout(() => { setServiceOpen(false); blur("service"); }, 150)}
                        className={`${inputClass(touched.service && !!errors.service)} flex items-center justify-between text-left rtl:text-right`}
                      >
                        <span className={formData.service ? "text-neutral-100" : "text-neutral-400"}>
                          {formData.service || t.formServicePlaceholder}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform ${serviceOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {serviceOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#081713] shadow-xl"
                          >
                            {SERVICE_IDS.map((s) => {
                              const info = t.services[s.id as keyof typeof t.services];
                              return (
                                <li key={s.id}>
                                  <button
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                      field("service", info.label);
                                      setServiceOpen(false);
                                      blur("service");
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-emerald-400/10 rtl:text-right"
                                  >
                                    <span className="text-lg">{s.icon}</span>
                                    <span>
                                      <span className="block text-sm font-medium text-neutral-100">{info.label}</span>
                                      <span className="block text-xs text-neutral-400">{info.desc}</span>
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </FieldWrapper>

                  {/* Date + time */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FieldWrapper icon={<Calendar className="h-4 w-4" />} label={t.formDate} error={touched.date ? errors.date : undefined}>
                      <input
                        type="date"
                        min={todayISO()}
                        value={formData.date}
                        onChange={(e) => field("date", e.target.value)}
                        onBlur={() => blur("date")}
                        aria-label={t.formDate}
                        className={`${inputClass(touched.date && !!errors.date)} [color-scheme:dark]`}
                      />
                    </FieldWrapper>

                    <FieldWrapper icon={<Clock className="h-4 w-4" />} label={t.formTime} error={touched.time ? errors.time : undefined}>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setTimeOpen((v) => !v)}
                          onBlur={() => setTimeout(() => { setTimeOpen(false); blur("time"); }, 150)}
                          className={`${inputClass(touched.time && !!errors.time)} flex items-center justify-between text-left rtl:text-right`}
                        >
                          <span className={formData.time ? "text-neutral-100" : "text-neutral-400"}>
                            {formData.time || t.formTimePlaceholder}
                          </span>
                          <ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform ${timeOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {timeOpen && (
                            <motion.ul
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-20 mt-2 max-h-52 w-full overflow-y-auto rounded-xl border border-white/10 bg-[#081713] shadow-xl"
                            >
                              {TIME_SLOTS.map((slot) => (
                                <li key={slot}>
                                  <button
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                      field("time", slot);
                                      setTimeOpen(false);
                                      blur("time");
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-neutral-100 transition hover:bg-emerald-400/10 rtl:text-right"
                                  >
                                    {slot}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </FieldWrapper>
                  </div>

                  {/* Notes */}
                  <FieldWrapper icon={<FileText className="h-4 w-4" />} label={t.formNotes}>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => field("notes", e.target.value)}
                      placeholder={t.formNotesPlaceholder}
                      rows={3}
                      aria-label={t.formNotes}
                      className={`${inputClass(false)} resize-none`}
                    />
                  </FieldWrapper>

                  {/* Submit */}
                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <SuccessRing label={t.submitSuccess} detail={t.successDetail} />
                      </motion.div>
                    ) : (
                      <motion.div key="submit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 pt-2">
                        {status === "error" && (
                          <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            <span>{t.errorGeneric}</span>
                          </div>
                        )}
                        <RippleButton
                          disabled={status === "loading"}
                          className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold text-[#02110d] transition ${
                            status === "loading" ? "bg-emerald-400/60" : "bg-emerald-400 hover:bg-emerald-300 active:scale-[0.99]"
                          }`}
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              {t.submitLoading}
                            </>
                          ) : status === "error" ? (
                            t.errorRetry
                          ) : (
                            t.submit
                          )}
                        </RippleButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              ) : (
                <motion.div
                  key="whatsapp"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="py-6 text-center"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
                    <MessageCircle className="h-7 w-7 text-green-400" />
                  </div>
                  <p className="mx-auto max-w-sm text-sm leading-relaxed text-neutral-300">{t.whatsappIntro}</p>
                  <RippleButton
                    type="button"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-green-400 active:scale-[0.99]"
                  >
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {t.whatsappCta}
                    </a>
                  </RippleButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Right / illustrative panel                                       */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0A1F1B] via-[#071612] to-[#050706] shadow-2xl">
            <FloatingOrbs />
            <div className="absolute inset-0 flex items-center justify-center">
              <ToothShape className="h-56 w-56 text-emerald-400/25 drop-shadow-[0_0_60px_rgba(16,185,129,0.15)]" />
            </div>

            {/* Floating rating card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute left-6 top-6 rounded-2xl border border-white/10 bg-[#081713]/80 p-4 shadow-xl backdrop-blur-md rtl:left-auto rtl:right-6"
            >
              <div className="flex items-center gap-1 text-[#34d399]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-1.5 text-xs text-neutral-200">{t.ratingText}</p>
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-[#081713]/80 p-4 shadow-xl backdrop-blur-md rtl:right-auto rtl:left-6"
            >
              <p className="font-serif text-2xl text-neutral-50">1000+</p>
              <p className="text-xs text-neutral-300">{t.badge1.replace(/^[^\d]*\d+\+?\s*/, "")}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small presentational helpers                                             */
/* -------------------------------------------------------------------------- */

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-400 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(16,185,129,0.12)] ${
    hasError
      ? "border-red-400/50 focus:border-red-400"
      : "border-white/10 focus:border-emerald-400/60"
  }`;
}

function FieldWrapper({
  icon,
  label,
  error,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-300">
        {icon}
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
          >
            <AlertCircle className="h-3 w-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
