"use client";

export default function MessageThreadSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--surface2)]" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 animate-pulse rounded bg-[var(--surface2)]" />
            <div className="h-3 w-full animate-pulse rounded bg-[var(--surface2)]" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-[var(--surface2)]" />
          </div>
        </div>
      ))}
    </div>
  );
}
