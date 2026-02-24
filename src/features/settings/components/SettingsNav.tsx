"use client";

import { cn } from "@/lib";

export type SettingsTab =
  | "profile"
  | "workspace"
  | "security"
  | "notifications"
  | "integrations"
  | "vora"
  | "billing";

type SettingsNavProps = {
  activeTab: SettingsTab;
  onChange: (tab: SettingsTab) => void;
  className?: string;
  compact?: boolean;
};

const tabs: { key: SettingsTab; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "workspace", label: "Workspace" },
  { key: "security", label: "Security" },
  { key: "notifications", label: "Notifications" },
  { key: "integrations", label: "Integrations" },
  { key: "vora", label: "Vora" },
  { key: "billing", label: "Billing" },
];

export default function SettingsNav({ activeTab, onChange, className, compact = false }: SettingsNavProps) {
  return (
    <nav className={cn("space-y-1", className)} aria-label="Settings navigation">
      {tabs.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              "w-full rounded-lg border text-left transition-colors",
              compact ? "px-3 py-2 text-sm" : "px-3 py-2.5 text-sm",
              active
                ? "border-[var(--blue)] bg-[var(--blue)]/15 text-[var(--text)]"
                : "border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)] hover:bg-[var(--surface)]"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
