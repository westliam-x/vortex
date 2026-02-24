"use client";

import { StatusBadge } from "@/components/ui";

export type StreamEvent = {
  id: string;
  time: string;
  actor: string;
  action: string;
  target: string;
  status: string;
  category: "All" | "Auth" | "Files" | "Payments" | "Reviews";
};

type EventRowProps = {
  event: StreamEvent;
};

export default function EventRow({ event }: EventRowProps) {
  return (
    <div className="grid grid-cols-[0.9fr_1fr_1fr_1fr_0.8fr] items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface2)] px-2 py-2 text-xs font-mono">
      <span className="truncate text-[var(--muted)]">{event.time}</span>
      <span className="truncate text-[var(--text)]">{event.actor}</span>
      <span className="truncate text-[var(--text)]">{event.action}</span>
      <span className="truncate text-[var(--text)]">{event.target}</span>
      <StatusBadge kind="log" status={event.status} className="w-fit" />
    </div>
  );
}

export type { EventRowProps };
