import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://texai-agency.vercel.app"),

  title: {
    default: "TEXAI | AI Automation Agency",
    template: "%s | TEXAI",
  },

  description:
    "TEXAI helps businesses automate workflows using AI Agents, AI Chatbots, and intelligent automation solutions to save time, reduce costs, and increase revenue.",

  keywords: [
    "AI Automation",
    "AI Agency",
    "AI Agents",
    "AI Chatbot",
    "Workflow Automation",
    "Business Automation",
    "Artificial Intelligence",
    "CRM Integration",
    "Automation Agency",
    "TEXAI",
  ],

  authors: [
    {
      name: "TEXAI",
    },
  ],

  creator: "TEXAI",

  publisher: "TEXAI",

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "SEx3T7sQc9OUXruzVo2BKrGrXqaNhQF340gR0OyMe9c",
  },

  openGraph: {
    title: "TEXAI | AI Automation Agency",
    description:
      "AI Automation solutions for modern businesses. We build AI Agents, AI Chatbots, workflow automations and custom AI systems.",
    url: "https://texai-agency.vercel.app",
    siteName: "TEXAI",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TEXAI | AI Automation Agency",
    description:
      "Helping businesses automate with AI Agents and Workflow Automation.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased scroll-smooth">
        {children}
      </body>
    </html>
  );
}