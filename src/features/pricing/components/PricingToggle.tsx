"use client";

type PricingToggleProps = {
  value: "monthly" | "yearly";
  onChange: (value: "monthly" | "yearly") => void;
};

export default function PricingToggle({ value, onChange }: PricingToggleProps) {
  return (
    <div className="mx-auto inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1">
      <button
        type="button"
        className={`rounded-md px-3 py-1.5 text-sm ${
          value === "monthly"
            ? "bg-[var(--blue)] text-[var(--text)]"
            : "text-[var(--muted)] hover:bg-[var(--surface2)]"
        }`}
        onClick={() => onChange("monthly")}
      >
        Monthly
      </button>
      <button
        type="button"
        className={`rounded-md px-3 py-1.5 text-sm ${
          value === "yearly"
            ? "bg-[var(--blue)] text-[var(--text)]"
            : "text-[var(--muted)] hover:bg-[var(--surface2)]"
        }`}
        onClick={() => onChange("yearly")}
      >
        Yearly
      </button>
    </div>
  );
}
