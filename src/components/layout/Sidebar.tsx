"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Bot,
  BriefcaseBusiness,
  CircleDollarSign,
  Compass,
  FolderKanban,
  Gauge,
  Grid2X2,
  MessageSquareShare,
  Settings,
  Signal,
  Star,
  Users,
} from "lucide-react";
import { cn } from "@/lib";

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type SidebarGroup = {
  label: string;
  items: SidebarItem[];
};

const navGroups: SidebarGroup[] = [
  {
    label: "Workspace",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: Gauge },
      { label: "Team", href: "/team", icon: Users },
    ],
  },
  {
    label: "Work",
    items: [
      { label: "Projects", href: "/projects", icon: FolderKanban },
      { label: "Clients", href: "/clients", icon: Users },
      { label: "Spaces", href: "/spaces", icon: MessageSquareShare },
      { label: "Reviews", href: "/reviews", icon: Star },
      { label: "Discover", href: "/discover", icon: Compass },
      { label: "Signal", href: "/signal", icon: Signal },
    ],
  },
  {
    label: "Money",
    items: [
      { label: "Invoices", href: "/invoices", icon: BriefcaseBusiness },
      { label: "Payments", href: "/payments", icon: CircleDollarSign },
    ],
  },
  {
    label: "Audit",
    items: [{ label: "Logs", href: "/logs", icon: BookOpen }],
  },
  {
    label: "System",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "Vora", href: "/vora", icon: Bot },
    ],
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

type SidebarProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-full w-full overflow-y-auto border-r border-[var(--border)] bg-[var(--surface)]",
        mobile ? "p-4" : "p-5"
      )}
    >
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--mint)]">
          <Grid2X2 size={16} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-[var(--muted)]">Workspace</p>
          <p className="text-sm font-semibold text-[var(--text)]">Vortex</p>
        </div>
      </div>

      <nav className="space-y-5">
        {navGroups.map((group) => (
          <section key={group.label}>
            <p className="mb-2 px-2 text-xs uppercase tracking-wider text-[var(--muted)]">{group.label}</p>
            <div className="space-y-1">
              {group.items.map(({ label, href, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors",
                      active
                        ? "border-[var(--blue)] bg-[var(--surface2)] text-[var(--text)]"
                        : "border-transparent text-[var(--muted)] hover:border-[var(--border)] hover:bg-[var(--surface2)] hover:text-[var(--text)]"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  );
}
