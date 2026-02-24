import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ToastProvider } from "@/components/ui";

const geist = localFont({
  src: [
    { path: "../../public/fonts/Geist-Latin.woff2", style: "normal" },
    { path: "../../public/fonts/Geist-Latin-Ext.woff2", style: "normal" },
  ],
  variable: "--font-geist",
  display: "swap",
});

const firaCode = localFont({
  src: [
    { path: "../../public/fonts/FiraCode-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/FiraCode-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/FiraCode-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-fira-code",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${firaCode.variable}`}>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
