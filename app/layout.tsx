import type { Metadata, Viewport } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import { profile, SITE_URL } from "@/data/profile";
import "./globals.css";

// Manrope có subset vietnamese — cần cho tên có dấu ("Lương Quốc Dũng")
const appSans = Manrope({
  variable: "--font-app-sans",
  subsets: ["latin", "vietnamese"],
});

const appMono = Geist_Mono({
  variable: "--font-app-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — AI Engineer`,
    template: `%s · ${profile.name}`,
  },
  description:
    "AI Engineer building production LLM systems: agents, RAG, telemetry, and cost control. Creator of TripNest AI — an AI travel agent in production with real payments.",
  keywords: [
    "AI Engineer",
    "LLM",
    "RAG",
    "AI Agents",
    "FastAPI",
    "Next.js",
    "Luong Quoc Dung",
  ],
  authors: [{ name: profile.englishName, url: profile.github }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${profile.name} — AI Engineer`,
    description:
      "Production AI systems end to end: agents, RAG, telemetry, cost control.",
    siteName: profile.englishName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI Engineer`,
    description:
      "Production AI systems end to end: agents, RAG, telemetry, cost control.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${appSans.variable} ${appMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
