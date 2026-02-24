"use client";

import { PageHeader } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import { Badge } from "@/components/ui";
import { useFeature } from "@/hooks/useFeature";
import { useSignalProfile } from "./hooks/useSignalProfile";
import SignalToggle from "./components/SignalToggle";
import SignalProfileForm from "./components/SignalProfileForm";
import AvailabilityCard from "./components/AvailabilityCard";

export default function SignalProfile() {
  const { active, setActive, profile, setProfile, saveProfile, saving, savedAt, hydrated } = useSignalProfile();
  const { enabled } = useFeature("signalEnabled");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Signal"
        subtitle="Manage discoverability and collaboration availability."
        rightSlot={enabled ? undefined : <Badge tone="info">Pro</Badge>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <section className="space-y-4 lg:col-span-8">
          <SectionCard title="Signal status">
            <SignalToggle active={active} onChange={setActive} />
          </SectionCard>

          <SectionCard title="Availability profile">
            <SignalProfileForm
              value={profile}
              onChange={setProfile}
              saving={saving}
              onSave={() => {
                void saveProfile(profile);
              }}
            />
            {savedAt ? <p className="mt-2 text-xs text-[var(--muted)]">Saved {new Date(savedAt).toLocaleString()}</p> : null}
            {!hydrated ? <p className="mt-2 text-xs text-[var(--muted)]">Loading local profile...</p> : null}
          </SectionCard>
        </section>

        <aside className="space-y-4 lg:col-span-4">
          <SectionCard title="Summary">
            <AvailabilityCard active={active} profile={profile} />
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
