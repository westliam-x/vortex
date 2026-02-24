"use client";

export default function ChatEmptyState() {
  return (
    <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-4 text-center">
      <p className="text-sm font-medium text-[var(--text)]">Start a conversation with Vora</p>
      <p className="mt-1 text-xs text-[var(--muted)]">
        Ask for drafts, summaries, or next-step recommendations.
      </p>
    </div>
  );
}
