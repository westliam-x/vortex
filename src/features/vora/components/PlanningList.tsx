import PlanningItem, { type PlanningItemTone } from "./PlanningItem";

export type PlanningListItem = {
  id: string;
  title: string;
  meta?: string;
  description?: string;
  tone?: PlanningItemTone;
  rightLabel?: string;
};

type PlanningListProps = {
  items: PlanningListItem[];
  emptyText?: string;
};

export default function PlanningList({ items, emptyText = "No items yet." }: PlanningListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface2)] px-3 py-6 text-center text-sm text-[var(--muted)]">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <PlanningItem
          key={item.id}
          title={item.title}
          meta={item.meta}
          description={item.description}
          tone={item.tone}
          rightSlot={
            item.rightLabel ? (
              <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[11px] text-[var(--muted)]">
                {item.rightLabel}
              </span>
            ) : undefined
          }
        />
      ))}
    </div>
  );
}
