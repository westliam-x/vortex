"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { handleLogout } from "@/services/authServices";
import {
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  ReceiptText,
  Settings,
  Star,
  Users,
} from "lucide-react";
import { cn } from "@/lib";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  // { name: "Vortex Spaces", href: "/vortexes", icon: Zap, badge: "Soon" },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Invoices", href: "/invoice", icon: ReceiptText },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings, badge: "Soon" },
  { name: "Logs", href: "/logs", icon: BookOpen },
  { name: "Logout", href: "#", icon: LogOut, logout: true },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await handleLogout();
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-[var(--bg-elevated)] border-r border-[var(--border)] p-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-strong)]/40 flex items-center justify-center text-[var(--accent)] font-semibold">
          V
        </div>
        <div>
          <p className="text-sm text-[var(--text-subtle)]">Workspace</p>
          <h1 className="text-lg font-semibold text-[var(--text)]">Vortex</h1>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map(({ href, name, icon: Icon, logout: isLogout, badge }) => {
          const isActive = pathname === href;

          if (isLogout) {
            return (
              <a
                key={name}
                href={href}
                onClick={logout}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] transition-all",
                  "hover:bg-[var(--surface)] hover:text-[var(--text)]"
                )}
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{name}</span>
              </a>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                isActive
                  ? "bg-[var(--accent-soft)] text-[var(--text)] border border-[var(--accent-strong)]/40"
                  : "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
              )}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{name}</span>
              </span>
              {badge ? (
                <span className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[10px] text-[var(--text-subtle)]">
                  {badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 text-xs text-[var(--text-subtle)]">
        <p>Ac {new Date().getFullYear()} Vortex</p>
      </div>
    </aside>
  );
};

export default Sidebar;
