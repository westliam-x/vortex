"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Bell, ChevronDown, LogOut, Menu, Plus, Search, Settings, UserCircle2 } from "lucide-react";
import { handleLogout } from "@/features/auth";
import { Button, IconButton, Input } from "@/components/ui";

type TopbarProps = {
  onToggleSidebar: () => void;
  breadcrumb?: ReactNode;
};

const QUICK_ACTIONS = [
  { label: "New project", href: "/projects" },
  { label: "New client", href: "/clients" },
  { label: "Create invoice", href: "/invoices/new" },
  { label: "Invite member", href: "/team" },
] as const;

const SEARCH_TARGETS = [
  { label: "Dashboard", href: "/dashboard", keywords: ["overview", "home", "summary"] },
  { label: "Projects", href: "/projects", keywords: ["project", "delivery"] },
  { label: "Clients", href: "/clients", keywords: ["customer", "client"] },
  { label: "Spaces", href: "/spaces", keywords: ["vortex", "space", "handover"] },
  { label: "Invoices", href: "/invoices", keywords: ["invoice", "billing"] },
  { label: "Payments", href: "/payments", keywords: ["payment", "transaction"] },
  { label: "Reviews", href: "/reviews", keywords: ["review", "rating"] },
  { label: "Logs", href: "/logs", keywords: ["audit", "logs", "events"] },
  { label: "Team", href: "/team", keywords: ["members", "teammates"] },
  { label: "Signal", href: "/signal", keywords: ["discover", "collaboration"] },
  { label: "Vora", href: "/vora", keywords: ["assistant", "ai", "drafts"] },
  { label: "Settings", href: "/settings", keywords: ["profile", "preferences", "account"] },
  { label: "Pricing", href: "/pricing", keywords: ["plan", "upgrade"] },
] as const;

const NOTIFICATIONS = [
  { label: "Payment confirmed", detail: "Invoice #INV-204 was paid.", href: "/payments" },
  { label: "Review pending", detail: "1 review is awaiting approval.", href: "/reviews" },
  { label: "New invite", detail: "A collaborator invite needs action.", href: "/team" },
] as const;

export default function Topbar({ onToggleSidebar, breadcrumb }: TopbarProps) {
  const router = useRouter();
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);
  const menusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!menusRef.current?.contains(event.target as Node)) {
        setQuickActionsOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

    const tick = () => setClockTime(formatter.format(new Date()));
    tick();

    const interval = window.setInterval(tick, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_TARGETS.filter((item) => {
      const inLabel = item.label.toLowerCase().includes(q);
      const inKeywords = item.keywords.some((keyword) => keyword.includes(q));
      return inLabel || inKeywords;
    }).slice(0, 6);
  }, [searchTerm]);

  const goTo = (href: string) => {
    setQuickActionsOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
    router.push(href);
  };

  const onSearchSubmit = () => {
    const firstMatch = searchResults[0];
    if (firstMatch) {
      goTo(firstMatch.href);
      setSearchTerm("");
      return;
    }
    goTo("/logs");
  };

  const onSignOut = async () => {
    try {
      await handleLogout();
    } catch {
      // noop: fallback to local signout
    } finally {
      Cookies.remove("logged_in");
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div ref={menusRef} className="flex flex-wrap items-center gap-2 px-3 py-2 md:flex-nowrap md:gap-3 md:px-6">
        <IconButton className="md:hidden" variant="outline" aria-label="Toggle navigation" onClick={onToggleSidebar}>
          <Menu size={16} />
        </IconButton>

        {breadcrumb ? <div className="hidden shrink-0 text-sm text-[var(--muted)] lg:block">{breadcrumb}</div> : null}

        <div className="relative order-3 w-full md:order-none md:flex-1">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <Input
              className="h-9 pl-9"
              placeholder="Search pages..."
              value={searchTerm}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => {
                window.setTimeout(() => setSearchFocused(false), 120);
              }}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onSearchSubmit();
                }
              }}
            />
          </div>

          {searchFocused && searchTerm.trim() ? (
            <div className="absolute left-0 right-0 mt-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg md:max-w-2xl">
              {searchResults.length ? (
                searchResults.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      goTo(item.href);
                      setSearchTerm("");
                    }}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[var(--muted)]">{item.href}</span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-[var(--muted)]">No match found. Press Enter to open Logs.</div>
              )}
            </div>
          ) : null}
        </div>

        <div className="order-2 ml-auto flex items-center gap-2 md:order-none">
          <div className="hidden rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--muted)] sm:block">
            {clockTime ?? "--:--"}
          </div>

          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              rightIcon={<ChevronDown size={14} />}
              leftIcon={<Plus size={14} />}
              onClick={() => {
                setQuickActionsOpen((prev) => !prev);
                setNotificationsOpen(false);
                setProfileOpen(false);
              }}
            >
              <span className="hidden sm:inline">Quick actions</span>
              <span className="sm:hidden">Quick</span>
            </Button>
            {quickActionsOpen ? (
              <div className="absolute right-0 mt-2 w-52 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg">
                {QUICK_ACTIONS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => goTo(item.href)}
                    className="flex w-full rounded-md px-3 py-2 text-left text-sm text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative">
            <IconButton
              aria-label="Notifications"
              variant="outline"
              onClick={() => {
                setNotificationsOpen((prev) => !prev);
                setQuickActionsOpen(false);
                setProfileOpen(false);
              }}
            >
              <Bell size={16} />
            </IconButton>
            {notificationsOpen ? (
              <div className="absolute right-0 mt-2 w-72 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg">
                {NOTIFICATIONS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => goTo(item.href)}
                    className="flex w-full flex-col items-start rounded-md px-3 py-2 text-left hover:bg-[var(--surface2)]"
                  >
                    <span className="text-sm text-[var(--text)]">{item.label}</span>
                    <span className="text-xs text-[var(--muted)]">{item.detail}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => goTo("/logs")}
                  className="mt-1 w-full rounded-md px-3 py-2 text-left text-xs text-[var(--muted)] hover:bg-[var(--surface2)]"
                >
                  View all activity
                </button>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setQuickActionsOpen(false);
                setNotificationsOpen(false);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 text-sm text-[var(--text)]"
            >
              <UserCircle2 size={16} />
              <span className="hidden sm:inline">Profile</span>
              <ChevronDown size={14} className="text-[var(--muted)]" />
            </button>
            {profileOpen ? (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => goTo("/settings?tab=profile")}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                >
                  <UserCircle2 size={14} />
                  My account
                </button>
                <button
                  type="button"
                  onClick={() => goTo("/settings?tab=workspace")}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                >
                  <Settings size={14} />
                  Preferences
                </button>
                <button
                  type="button"
                  onClick={() => goTo("/settings")}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                >
                  <Settings size={14} />
                  Settings
                </button>
                <button
                  type="button"
                  onClick={() => void onSignOut()}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--danger)] hover:bg-[var(--surface2)]"
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
