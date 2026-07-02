import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEXAI - AI Automation Agency",
  description:
    "We build AI automation systems that help businesses scale, automate workflows, and increase revenue.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased scroll-smooth">
        {children}
      </body>
    </html>
  );
}