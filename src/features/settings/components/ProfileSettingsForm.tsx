"use client";

import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/features/auth";
import { Button, Input } from "@/components/ui";
import { FormSection } from "@/components/patterns";

type ProfileDraft = {
  name: string;
  email: string;
  role: string;
};

const PROFILE_STORAGE_KEY = "vortex:settings:profile";

export default function ProfileSettingsForm() {
  const { profile, loading } = useProfile();
  const [draft, setDraft] = useState<ProfileDraft>({ name: "", email: "", role: "Owner" });
  const [touched, setTouched] = useState<{ name: boolean }>({ name: false });
  const [saving, setSaving] = useState(false);
  const [saveLabel, setSaveLabel] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRaw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      if (storedRaw) {
        try {
          const stored = JSON.parse(storedRaw) as ProfileDraft;
          setDraft(stored);
          return;
        } catch {
          // fall through to profile default
        }
      }
    }

    if (profile) {
      setDraft({
        name: profile.name || `${profile.firstName} ${profile.secondName}`.trim(),
        email: profile.email ?? "",
        role: "Owner",
      });
    }
  }, [profile]);

  const errors = useMemo(() => {
    const next: { name?: string } = {};
    if (!draft.name.trim()) next.name = "Name is required.";
    else if (draft.name.trim().length < 2) next.name = "Name must be at least 2 characters.";
    return next;
  }, [draft.name]);

  const canSave = !errors.name && !!draft.email && !loading;

  const onSave = async () => {
    setTouched({ name: true });
    if (!canSave) return;

    setSaving(true);
    setSaveLabel(null);
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(draft));
      window.localStorage.setItem("vortex:user:name", draft.name);
      window.dispatchEvent(new CustomEvent("vortex:vora:settings-change"));
    }
    setSaving(false);
    setSaveLabel("Saved");
  };

  return (
    <div className="space-y-4">
      <FormSection title="Identity" description="Public account details used across your workspace.">
        <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
          <div className="grid h-12 w-12 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm font-semibold text-[var(--muted)]">
            {draft.name.trim().slice(0, 1).toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text)]">Avatar</p>
            <p className="text-xs text-[var(--muted)]">Placeholder</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="profile-name" className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Name
          </label>
          <Input
            id="profile-name"
            value={draft.name}
            error={Boolean(touched.name && errors.name)}
            onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          />
          {touched.name && errors.name ? <p className="text-xs text-[var(--danger)]">{errors.name}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="profile-email" className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Email
          </label>
          <Input id="profile-email" value={draft.email} readOnly disabled />
          <p className="text-xs text-[var(--muted)]">Email is managed by authentication settings.</p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="profile-role" className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Role
          </label>
          <Input id="profile-role" value={draft.role} readOnly disabled />
        </div>
      </FormSection>

      <div className="flex items-center gap-2">
        <Button loading={saving} disabled={!canSave} onClick={() => void onSave()}>
          Save profile
        </Button>
        {saveLabel ? <span className="text-xs text-[var(--muted)]">{saveLabel}</span> : null}
      </div>
    </div>
  );
}
