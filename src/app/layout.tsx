import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_TC } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Parallax from "@/components/Parallax";
import LuckyDraw from "@/components/LuckyDraw";
import WelcomeGate from "@/components/WelcomeGate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  weight: ["400", "600"],
  preload: false,
});

export const metadata: Metadata = {
  title: "金穗果園｜嚴選台灣芒果",
  description: "樹上熟成、產地直送的台灣愛文與金煌芒果",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifTC.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col overflow-x-clip bg-[#0d0f0c] text-stone-100">
        {/* 背景光暈 */}
        <div className="pointer-events-none absolute inset-0">
          <Parallax
            speed={-0.4}
            className="absolute -top-40 -left-32"
            innerClassName="h-[520px] w-[520px] rounded-full bg-amber-500/30 blur-[140px]"
          />
          <Parallax
            speed={-0.25}
            className="absolute top-1/3 -right-40"
            innerClassName="h-[600px] w-[600px] rounded-full bg-orange-600/25 blur-[160px]"
          />
          <Parallax
            speed={-0.15}
            className="absolute bottom-0 left-1/4"
            innerClassName="h-[480px] w-[480px] rounded-full bg-emerald-700/25 blur-[150px]"
          />
        </div>

        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
        <LuckyDraw />
        <WelcomeGate />
      </body>
    </html>
  );
}
