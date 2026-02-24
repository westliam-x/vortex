"use client";

import { useState, type ReactNode } from "react";
import { Bell, ChevronDown, Menu, Plus, Search, UserCircle2 } from "lucide-react";
import { Button, IconButton, Input } from "@/components/ui";

type TopbarProps = {
  onToggleSidebar: () => void;
  breadcrumb?: ReactNode;
};

export default function Topbar({ onToggleSidebar, breadcrumb }: TopbarProps) {
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        <IconButton className="md:hidden" variant="outline" aria-label="Toggle navigation" onClick={onToggleSidebar}>
          <Menu size={16} />
        </IconButton>

        {breadcrumb ? <div className="hidden shrink-0 text-sm text-[var(--muted)] lg:block">{breadcrumb}</div> : null}

        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <Input className="pl-9" placeholder="Search projects, clients, logs..." />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              rightIcon={<ChevronDown size={14} />}
              leftIcon={<Plus size={14} />}
              onClick={() => setQuickActionsOpen((prev) => !prev)}
            >
              Quick actions
            </Button>
            {quickActionsOpen ? (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg">
                {[
                  "New project",
                  "New client",
                  "Create invoice",
                  "Invite member",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex w-full rounded-md px-3 py-2 text-left text-sm text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <IconButton aria-label="Notifications" variant="outline">
            <Bell size={16} />
          </IconButton>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 text-sm text-[var(--text)]"
            >
              <UserCircle2 size={16} />
              <span className="hidden sm:inline">Profile</span>
              <ChevronDown size={14} className="text-[var(--muted)]" />
            </button>
            {profileOpen ? (
              <div className="absolute right-0 mt-2 w-44 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg">
                {[
                  "My account",
                  "Preferences",
                  "Theme",
                  "Sign out",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex w-full rounded-md px-3 py-2 text-left text-sm text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
