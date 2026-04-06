import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RenoAI — Будущее ремонта уже здесь",
  description:
    "AI-платформа, которая объединяет дизайн, расчёты и реализацию ремонта в единую систему — быстро, точно и прозрачно.",
  keywords: ["ремонт", "AI", "дизайн интерьера", "визуализация", "смета", "RenoAI"],
  authors: [{ name: "RenoAI" }],
  openGraph: {
    title: "RenoAI — Будущее ремонта уже здесь",
    description:
      "AI-платформа для ремонта: визуализация, дизайн и смета за несколько минут.",
    type: "website",
    siteName: "RenoAI",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#081512",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full bg-[#081512] text-[#F5F7F6] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
