"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Drawer } from "@/components/ui";

type AppShellProps = {
  header?: ReactNode;
  children: ReactNode;
};

export default function AppShell({ header, children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const syncViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileViewport(mobile);
      if (!mobile) {
        setMobileOpen(false);
      }
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] md:grid md:grid-cols-[18rem_minmax(0,1fr)]">
      <div className="hidden shrink-0 md:block">
        <div className="sticky top-0 h-screen shrink-0">
          <Sidebar />
        </div>
      </div>

      <div className="md:hidden">
        <Drawer
          open={isMobileViewport && mobileOpen}
          onClose={() => setMobileOpen(false)}
          side="left"
          className="w-72 max-w-[80vw] p-0"
        >
          <Sidebar mobile onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      </div>

      <div className="min-w-0">
        <Topbar onToggleSidebar={() => {
          if (!isMobileViewport) return;
          setMobileOpen((prev) => !prev);
        }} />
        <main className="p-4 md:p-6">
          {header ? <div className="mb-6">{header}</div> : null}
          {children}
        </main>
      </div>
    </div>
  );
}
