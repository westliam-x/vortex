"use client";

export default function EventStreamSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[0.9fr_1fr_1fr_1fr_0.8fr] gap-2 rounded-md border border-[var(--border)] bg-[var(--surface2)] px-2 py-2"
        >
          <div className="h-3 animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-3 animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-3 animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-3 animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-3 animate-pulse rounded bg-[var(--surface)]" />
        </div>
      ))}
    </div>
  );
}
