"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="hidden w-72 shrink-0 md:block">
        <Sidebar />
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-[var(--overlay)]"
          />
          <div className="absolute left-0 top-0 h-full w-72 border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl">
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
              >
                <X size={18} />
              </button>
            </div>
            <Sidebar mobile onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onToggleSidebar={() => setMobileOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
