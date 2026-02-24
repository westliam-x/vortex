"use client";

import { useMemo, useState } from "react";
import { SectionCard } from "@/components/patterns";
import EventRow, { type StreamEvent } from "./EventRow";
import EventStreamSkeleton from "./EventStreamSkeleton";

type EventFilter = "All" | "Auth" | "Files" | "Payments" | "Reviews";

type EventStreamProps = {
  events: StreamEvent[];
  loading?: boolean;
};

const FILTERS: EventFilter[] = ["All", "Auth", "Files", "Payments", "Reviews"];

export default function EventStream({ events, loading = false }: EventStreamProps) {
  const [filter, setFilter] = useState<EventFilter>("All");
  const filteredEvents = useMemo(
    () => (filter === "All" ? events : events.filter((event) => event.category === filter)),
    [events, filter]
  );

  return (
    <SectionCard title="Event Stream" description="Audit-like activity log">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => {
          const active = item === filter;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={
                active
                  ? "rounded-md border border-[var(--blue)] bg-[var(--surface2)] px-2 py-1 text-xs text-[var(--text)]"
                  : "rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--text)]"
              }
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mt-3 space-y-2">
        {loading ? <EventStreamSkeleton /> : null}
        {!loading && filteredEvents.length === 0 ? (
          <p className="text-xs text-[var(--muted)]">No events in this category.</p>
        ) : null}
        {!loading ? filteredEvents.map((event) => <EventRow key={event.id} event={event} />) : null}
      </div>
    </SectionCard>
  );
}

export type { EventStreamProps, EventFilter };
