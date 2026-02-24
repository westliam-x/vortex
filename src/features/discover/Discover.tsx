"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout";
import { EmptyState } from "@/components/ui";
import { SmartInviteModal } from "@/features/signal";
import DiscoverCard from "./components/DiscoverCard";
import DiscoverFilters from "./components/DiscoverFilters";
import { useDiscover } from "./hooks/useDiscover";
import type { DiscoverDeveloper } from "./types";

export default function Discover() {
  const { developers, filters, setFilters, loading, stackOptions, timezoneOptions } = useDiscover();
  const [selectedDeveloper, setSelectedDeveloper] = useState<DiscoverDeveloper | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="Discover" subtitle="Find collaborators by role, stack, and timezone." />

      <DiscoverFilters
        value={filters}
        onChange={setFilters}
        stackOptions={stackOptions}
        timezoneOptions={timezoneOptions}
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-44 animate-pulse rounded-xl border border-[var(--border)] bg-[var(--surface2)]" />
          ))}
        </div>
      ) : developers.length === 0 ? (
        <EmptyState title="No developers found" description="Try adjusting your filters." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {developers.map((developer) => (
            <DiscoverCard
              key={developer.id}
              developer={developer}
              onSignalInvite={(picked) => {
                setSelectedDeveloper(picked);
                setInviteOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {selectedDeveloper ? (
        <SmartInviteModal
          open={inviteOpen}
          onOpenChange={setInviteOpen}
          candidateName={selectedDeveloper.name}
          initialRole={selectedDeveloper.roles[0]}
        />
      ) : null}
    </div>
  );
}
