"use client";

import { FilterBar } from "@/components/patterns";
import { Select } from "@/components/ui";
import type { DiscoverFiltersState, DiscoverRole } from "../types";

type DiscoverFiltersProps = {
  value: DiscoverFiltersState;
  onChange: (next: DiscoverFiltersState) => void;
  stackOptions: string[];
  timezoneOptions: string[];
};

const roleOptions: Array<DiscoverRole | "All"> = ["All", "Backend", "Frontend", "UI/UX", "DevOps", "PM"];

export default function DiscoverFilters({ value, onChange, stackOptions, timezoneOptions }: DiscoverFiltersProps) {
  return (
    <FilterBar
      filterChipsSlot={
        <>
          <Select
            value={value.role}
            onChange={(event) => onChange({ ...value, role: event.target.value as DiscoverRole | "All" })}
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                Role: {role}
              </option>
            ))}
          </Select>
          <Select value={value.stack} onChange={(event) => onChange({ ...value, stack: event.target.value })}>
            <option value="All">Stack: All</option>
            {stackOptions.map((stack) => (
              <option key={stack} value={stack}>
                Stack: {stack}
              </option>
            ))}
          </Select>
          <Select value={value.timezone} onChange={(event) => onChange({ ...value, timezone: event.target.value })}>
            <option value="All">Timezone: All</option>
            {timezoneOptions.map((timezone) => (
              <option key={timezone} value={timezone}>
                Timezone: {timezone}
              </option>
            ))}
          </Select>
        </>
      }
    />
  );
}
