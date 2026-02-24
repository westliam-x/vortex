"use client";

type SignalToggleProps = {
  active: boolean;
  onChange: (next: boolean) => void;
};

export default function SignalToggle({ active, onChange }: SignalToggleProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2)] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">Signal availability</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {active ? "Available for collaboration" : "Not discoverable"}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={active}
          aria-label="Toggle signal availability"
          onClick={() => onChange(!active)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full border transition-colors ${
            active ? "border-[var(--mint)] bg-[var(--mint)]" : "border-[var(--border)] bg-[var(--surface)]"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-[var(--text)] transition-transform ${
              active ? "translate-x-8" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
