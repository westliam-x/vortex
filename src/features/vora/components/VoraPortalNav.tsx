"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib";
import { Badge } from "@/components/ui";
import { useFeature } from "@/hooks/useFeature";

const items: Array<{ label: string; href: string; premiumFeature?: "analyticsAdvanced" }> = [
  { label: "Overview", href: "/vora" },
  { label: "Planning", href: "/vora/planning" },
  { label: "Analytics", href: "/vora/analytics", premiumFeature: "analyticsAdvanced" },
  { label: "Settings", href: "/vora/settings" },
];

export default function VoraPortalNav() {
  const pathname = usePathname();
  const { enabled: analyticsAdvancedEnabled } = useFeature("analyticsAdvanced");

  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const active = pathname === item.href;
        const showProBadge = item.premiumFeature === "analyticsAdvanced" && !analyticsAdvancedEnabled;
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
            <span className="inline-flex items-center gap-2">
              {item.label}
              {showProBadge ? <Badge tone="info">Pro</Badge> : null}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
