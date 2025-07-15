// app/layout.tsx
import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0C0C1C] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
