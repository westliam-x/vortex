"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib";

const items = [
  { label: "Overview", href: "/vora" },
  { label: "Planning", href: "/vora/planning" },
  { label: "Analytics", href: "/vora/analytics" },
  { label: "Settings", href: "/vora/settings" },
] as const;

export default function VoraPortalNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-lg border px-3 py-2 text-sm transition-colors",
              active
                ? "border-[var(--blue)] bg-[var(--surface2)] text-[var(--text)]"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
