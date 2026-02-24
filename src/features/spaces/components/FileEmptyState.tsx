"use client";

export default function FileEmptyState() {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-center">
      <p className="text-sm font-medium text-[var(--text)]">No files uploaded</p>
      <p className="mt-1 text-xs text-[var(--muted)]">
        Drop files to begin handover documentation.
      </p>
    </div>
  );
}
