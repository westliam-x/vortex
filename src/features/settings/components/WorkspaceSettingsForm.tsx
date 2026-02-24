"use client";

import { useMemo, useState } from "react";
import { Button, Input, Select } from "@/components/ui";
import { FormSection } from "@/components/patterns";

type WorkspaceDraft = {
  name: string;
  currency: string;
  timezone: string;
};

const WORKSPACE_STORAGE_KEY = "vortex:settings:workspace";

const defaultWorkspace: WorkspaceDraft = {
  name: "Vortex Workspace",
  currency: "USD",
  timezone: "UTC",
};

const timezoneOptions = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
];

export default function WorkspaceSettingsForm() {
  const initial = (() => {
    if (typeof window === "undefined") return defaultWorkspace;
    const raw = window.localStorage.getItem(WORKSPACE_STORAGE_KEY);
    if (!raw) return defaultWorkspace;
    try {
      return { ...defaultWorkspace, ...(JSON.parse(raw) as Partial<WorkspaceDraft>) };
    } catch {
      return defaultWorkspace;
    }
  })();

  const [draft, setDraft] = useState<WorkspaceDraft>(initial);
  const [touched, setTouched] = useState<{ name: boolean; currency: boolean; timezone: boolean }>({
    name: false,
    currency: false,
    timezone: false,
  });
  const [saving, setSaving] = useState(false);
  const [saveLabel, setSaveLabel] = useState<string | null>(null);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof WorkspaceDraft, string>> = {};
    if (!draft.name.trim()) next.name = "Workspace name is required.";
    if (!draft.currency.trim()) next.currency = "Default currency is required.";
    if (!draft.timezone.trim()) next.timezone = "Timezone is required.";
    return next;
  }, [draft]);

  const canSave = !errors.name && !errors.currency && !errors.timezone;

  const onSave = async () => {
    setTouched({ name: true, currency: true, timezone: true });
    if (!canSave) return;
    setSaving(true);
    setSaveLabel(null);
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (typeof window !== "undefined") {
      window.localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(draft));
    }
    setSaving(false);
    setSaveLabel("Saved");
  };

  return (
    <div className="space-y-4">
      <FormSection title="Workspace defaults" description="Set defaults used for new projects and invoices.">
        <div className="space-y-1.5">
          <label htmlFor="workspace-name" className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Workspace name
          </label>
          <Input
            id="workspace-name"
            value={draft.name}
            error={Boolean(touched.name && errors.name)}
            onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          />
          {touched.name && errors.name ? <p className="text-xs text-[var(--danger)]">{errors.name}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="workspace-currency" className="text-xs uppercase tracking-wide text-[var(--muted)]">
              Default currency
            </label>
            <Select
              id="workspace-currency"
              value={draft.currency}
              error={Boolean(touched.currency && errors.currency)}
              onChange={(event) => setDraft((prev) => ({ ...prev, currency: event.target.value }))}
              onBlur={() => setTouched((prev) => ({ ...prev, currency: true }))}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="NGN">NGN</option>
            </Select>
            {touched.currency && errors.currency ? (
              <p className="text-xs text-[var(--danger)]">{errors.currency}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="workspace-timezone" className="text-xs uppercase tracking-wide text-[var(--muted)]">
              Timezone
            </label>
            <Select
              id="workspace-timezone"
              value={draft.timezone}
              error={Boolean(touched.timezone && errors.timezone)}
              onChange={(event) => setDraft((prev) => ({ ...prev, timezone: event.target.value }))}
              onBlur={() => setTouched((prev) => ({ ...prev, timezone: true }))}
            >
              {timezoneOptions.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </Select>
            {touched.timezone && errors.timezone ? (
              <p className="text-xs text-[var(--danger)]">{errors.timezone}</p>
            ) : null}
          </div>
        </div>
      </FormSection>

      <div className="flex items-center gap-2">
        <Button loading={saving} disabled={!canSave} onClick={() => void onSave()}>
          Save workspace
        </Button>
        {saveLabel ? <span className="text-xs text-[var(--muted)]">{saveLabel}</span> : null}
      </div>
    </div>
  );
}
