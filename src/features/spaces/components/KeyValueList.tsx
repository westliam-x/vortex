"use client";

import type { ReactNode } from "react";

type KeyValueListProps = {
  items: Array<{ key: string; value: ReactNode }>;
};

export default function KeyValueList({ items }: KeyValueListProps) {
  return (
    <dl className="space-y-2">
      {items.map((item) => (
        <div key={item.key} className="flex items-start justify-between gap-3 text-sm">
          <dt className="text-[var(--muted)]">{item.key}</dt>
          <dd className="text-right text-[var(--text)]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export type { KeyValueListProps };
