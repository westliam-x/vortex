"use client";

import { Bell, Menu } from "lucide-react";
import { useMobileSidebar } from "@/store/useMobileSidebar";
import { useEffect, useState } from "react";
import { useProfile } from "@/hooks/auth/useProfile";

const Navbar = () => {
  const openSidebar = useMobileSidebar((state) => state.open);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const { profile } = useProfile();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center px-4 h-14 border-b border-[var(--border)] bg-[var(--bg-elevated)]/80 backdrop-blur shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={openSidebar}
          className="md:hidden p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent-strong)] transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
        <div className="text-xs text-[var(--text-subtle)] font-mono">
          Local time {time}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]"
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>
        <span className="text-sm text-[var(--text-muted)]">
          Hi,{" "}
          <span className="font-medium text-[var(--text)]">
            {profile?.firstName ?? "Developer"}
          </span>
        </span>
        <div className="h-8 w-8 rounded-full bg-[var(--accent)]/20 border border-[var(--accent-strong)]/40 flex items-center justify-center text-xs text-[var(--text)] font-semibold">
          {(profile?.firstName ?? "V").slice(0, 1)}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
