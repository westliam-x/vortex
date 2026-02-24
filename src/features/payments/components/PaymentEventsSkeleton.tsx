"use client";

export default function PaymentEventsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
          <div className="h-4 w-24 animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-3 w-full animate-pulse rounded bg-[var(--surface)]" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-[var(--surface)]" />
        </div>
      ))}
    </div>
  );
}
