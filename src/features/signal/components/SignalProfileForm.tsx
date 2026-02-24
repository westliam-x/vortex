"use client";

import { useMemo, useState } from "react";
import { Button, Input, Select, Textarea } from "@/components/ui";
import { FormSection } from "@/components/patterns";
import { SIGNAL_ROLE_OPTIONS, type SignalProfile, type SignalRole } from "../types";
import StackSelector from "./StackSelector";

type SignalProfileFormProps = {
  value: SignalProfile;
  onChange: (next: SignalProfile) => void;
  onSave: () => void;
  saving: boolean;
};

type Touched = {
  headline: boolean;
  roles: boolean;
  hourly: boolean;
};

export default function SignalProfileForm({ value, onChange, onSave, saving }: SignalProfileFormProps) {
  const [touched, setTouched] = useState<Touched>({ headline: false, roles: false, hourly: false });

  const errors = useMemo(() => {
    const next: { headline?: string; roles?: string; hourly?: string } = {};
    if (!value.headline.trim()) next.headline = "Headline is required.";
    if (value.roles.length === 0) next.roles = "Select at least one role.";
    if (
      value.hourlyMin !== null &&
      value.hourlyMax !== null &&
      Number.isFinite(value.hourlyMin) &&
      Number.isFinite(value.hourlyMax) &&
      value.hourlyMin > value.hourlyMax
    ) {
      next.hourly = "Minimum hourly rate cannot exceed maximum.";
    }
    return next;
  }, [value.headline, value.hourlyMax, value.hourlyMin, value.roles.length]);

  const canSave = !errors.headline && !errors.roles && !errors.hourly && !saving;

  const toggleRole = (role: SignalRole) => {
    const exists = value.roles.includes(role);
    onChange({
      ...value,
      roles: exists ? value.roles.filter((entry) => entry !== role) : [...value.roles, role],
    });
  };

  return (
    <div className="space-y-4">
      <FormSection
        title="Availability profile"
        description="Define what you offer so collaborators can discover you."
      >
        <div className="space-y-1.5">
          <label htmlFor="signal-headline" className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Headline
          </label>
          <Input
            id="signal-headline"
            value={value.headline}
            error={Boolean(touched.headline && errors.headline)}
            onBlur={() => setTouched((prev) => ({ ...prev, headline: true }))}
            onChange={(event) => onChange({ ...value, headline: event.target.value })}
            placeholder="Senior full-stack engineer available for product builds"
          />
          {touched.headline && errors.headline ? (
            <p className="text-xs text-[var(--danger)]">{errors.headline}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Roles offered</p>
          <div className="flex flex-wrap gap-2">
            {SIGNAL_ROLE_OPTIONS.map((role) => {
              const selected = value.roles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`rounded-lg border px-2.5 py-1.5 text-sm transition-colors ${
                    selected
                      ? "border-[var(--blue)] bg-[var(--blue)]/20 text-[var(--text)]"
                      : "border-[var(--border)] bg-[var(--surface2)] text-[var(--muted)]"
                  }`}
                >
                  {role}
                </button>
              );
            })}
          </div>
          {touched.roles && errors.roles ? <p className="text-xs text-[var(--danger)]">{errors.roles}</p> : null}
        </div>

        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Tech stack tags</p>
          <StackSelector value={value.stackTags} onChange={(stackTags) => onChange({ ...value, stackTags })} />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="signal-hourly-min" className="text-xs uppercase tracking-wide text-[var(--muted)]">
              Hourly min
            </label>
            <Input
              id="signal-hourly-min"
              type="number"
              min={0}
              value={value.hourlyMin ?? ""}
              error={Boolean(touched.hourly && errors.hourly)}
              onBlur={() => setTouched((prev) => ({ ...prev, hourly: true }))}
              onChange={(event) =>
                onChange({
                  ...value,
                  hourlyMin: event.target.value === "" ? null : Number(event.target.value),
                })
              }
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="signal-hourly-max" className="text-xs uppercase tracking-wide text-[var(--muted)]">
              Hourly max
            </label>
            <Input
              id="signal-hourly-max"
              type="number"
              min={0}
              value={value.hourlyMax ?? ""}
              error={Boolean(touched.hourly && errors.hourly)}
              onBlur={() => setTouched((prev) => ({ ...prev, hourly: true }))}
              onChange={(event) =>
                onChange({
                  ...value,
                  hourlyMax: event.target.value === "" ? null : Number(event.target.value),
                })
              }
            />
          </div>
        </div>
        {touched.hourly && errors.hourly ? <p className="text-xs text-[var(--danger)]">{errors.hourly}</p> : null}

        <div className="space-y-1.5">
          <label htmlFor="signal-timezone" className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Timezone
          </label>
          <Select
            id="signal-timezone"
            value={value.timezone}
            onChange={(event) => onChange({ ...value, timezone: event.target.value })}
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York</option>
            <option value="America/Chicago">America/Chicago</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
            <option value="Europe/London">Europe/London</option>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="signal-bio" className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Short bio
          </label>
          <Textarea
            id="signal-bio"
            rows={4}
            value={value.bio}
            onChange={(event) => onChange({ ...value, bio: event.target.value })}
            placeholder="Describe your collaboration style and project strengths."
          />
        </div>
      </FormSection>

      <div className="flex items-center gap-2">
        <Button
          loading={saving}
          disabled={!canSave}
          onClick={() => {
            setTouched({ headline: true, roles: true, hourly: true });
            if (canSave) onSave();
          }}
        >
          Save profile
        </Button>
      </div>
    </div>
  );
}
