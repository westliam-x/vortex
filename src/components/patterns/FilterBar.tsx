import type { ReactNode } from "react";
import { Card } from "@/components/ui";

type FilterBarProps = {
  searchSlot?: ReactNode;
  filterChipsSlot?: ReactNode;
  sortSlot?: ReactNode;
  rightActionsSlot?: ReactNode;
};

export default function FilterBar({
  searchSlot,
  filterChipsSlot,
  sortSlot,
  rightActionsSlot,
}: FilterBarProps) {
  return (
    <Card className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">{searchSlot}</div>
        <div className="flex flex-wrap items-center gap-2">{filterChipsSlot}</div>
        <div className="flex items-center gap-2">{sortSlot}</div>
        <div className="ml-auto flex items-center gap-2">{rightActionsSlot}</div>
      </div>
    </Card>
  );
}

export type { FilterBarProps };
