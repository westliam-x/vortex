"use client";

export default function FilePanelSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[1.7fr_0.8fr_0.8fr_1fr] gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2"
        >
          <div className="h-3 animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-3 animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-3 animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-3 animate-pulse rounded bg-[var(--surface)]" />
        </div>
      ))}
    </div>
  );
}
