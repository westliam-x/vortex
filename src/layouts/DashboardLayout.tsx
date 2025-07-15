// src/layouts/DashboardLayout.tsx
"use client";

import { ReactNode } from "react";
import { MobileMenu, Navbar, Sidebar } from "@/shared";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="h-full overflow-hidden">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      <MobileMenu />
    </div>
  );
}
