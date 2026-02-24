"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui";
import { FormSection } from "@/components/patterns";

type NotificationPrefs = {
  projectUpdates: boolean;
  paymentUpdates: boolean;
  reviewNotifications: boolean;
  weeklySummary: boolean;
  securityAlerts: boolean;
};

const STORAGE_KEY = "vortex:settings:notifications";

const defaultPrefs: NotificationPrefs = {
  projectUpdates: true,
  paymentUpdates: true,
  reviewNotifications: true,
  weeklySummary: false,
  securityAlerts: true,
};

const preferenceItems: Array<{
  key: keyof NotificationPrefs;
  label: string;
  description: string;
  critical?: boolean;
}> = [
  {
    key: "projectUpdates",
    label: "Project updates",
    description: "Task changes, milestones, and status movement.",
  },
  {
    key: "paymentUpdates",
    label: "Payment updates",
    description: "Payment posted, failed, or pending alerts.",
  },
  {
    key: "reviewNotifications",
    label: "Review notifications",
    description: "New reviews, approvals, and moderation updates.",
  },
  {
    key: "weeklySummary",
    label: "Weekly summary",
    description: "Weekly digest of project, payment, and review activity.",
  },
  {
    key: "securityAlerts",
    label: "Security alerts",
    description: "Suspicious login and account security signals.",
    critical: true,
  },
];

const readInitialPrefs = (): NotificationPrefs => {
  if (typeof window === "undefined") return defaultPrefs;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultPrefs;
  try {
    return { ...defaultPrefs, ...(JSON.parse(raw) as Partial<NotificationPrefs>) };
  } catch {
    return defaultPrefs;
  }
};

export default function NotificationsSettings() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(readInitialPrefs);
  const [saving, setSaving] = useState(false);
  const [savedLabel, setSavedLabel] = useState<string | null>(null);

  const dirty = useMemo(() => {
    const baseline = readInitialPrefs();
    return preferenceItems.some((item) => prefs[item.key] !== baseline[item.key]);
  }, [prefs]);

  const onSave = async () => {
    setSaving(true);
    setSavedLabel(null);
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    }
    setSaving(false);
    setSavedLabel("Saved");
  };

  return (
    <div className="space-y-4">
      <FormSection
        title="Notification preferences"
        description="Choose which updates you want to receive."
      >
        <div className="space-y-2">
          {preferenceItems.map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--text)]">{item.label}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">{item.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={prefs[item.key]}
                aria-label={`Toggle ${item.label}`}
                onClick={() =>
                  setPrefs((prev) => ({
                    ...prev,
                    [item.key]: item.critical ? true : !prev[item.key],
                  }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
                  prefs[item.key]
                    ? "border-[var(--blue)] bg-[var(--blue)]"
                    : "border-[var(--border)] bg-[var(--surface)]"
                } ${item.critical ? "opacity-90" : ""}`}
                disabled={item.critical}
                title={item.critical ? "Security alerts are always enabled." : undefined}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    prefs[item.key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </label>
          ))}
        </div>
      </FormSection>

      <div className="flex items-center gap-2">
        <Button loading={saving} disabled={!dirty} onClick={() => void onSave()}>
          Save preferences
        </Button>
        {savedLabel ? <span className="text-xs text-[var(--muted)]">{savedLabel}</span> : null}
      </div>
    </div>
  );
}
