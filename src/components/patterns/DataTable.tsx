import type { Key, ReactNode } from "react";
import { Skeleton } from "@/components/ui";
import EmptyState, { type EmptyStateProps } from "./EmptyState";
import { cn } from "@/lib";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

type DataTableProps<T> = {
  columns: Array<DataTableColumn<T>>;
  rows: T[];
  loading?: boolean;
  loadingRows?: number;
  onRowClick?: (row: T) => void;
  getRowKey?: (row: T, index: number) => Key;
  emptyState?: EmptyStateProps;
  className?: string;
};

const defaultEmptyState: EmptyStateProps = {
  title: "No records",
  description: "There is nothing to show right now.",
  primaryAction: {
    label: "Refresh",
    variant: "secondary",
    onClick: () => undefined,
  },
};

export default function DataTable<T>({
  columns,
  rows,
  loading = false,
  loadingRows = 5,
  onRowClick,
  getRowKey,
  emptyState,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[var(--surface2)] text-[var(--muted)]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn("px-4 py-3 text-left text-xs font-medium uppercase tracking-wider", column.headerClassName)}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: loadingRows }).map((_, rowIndex) => (
                  <tr key={`loading-${rowIndex}`} className="border-t border-[var(--border)]">
                    {columns.map((column) => (
                      <td key={`${column.key}-${rowIndex}`} className="px-4 py-3">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              : rows.map((row, rowIndex) => {
                  const clickable = Boolean(onRowClick);
                  return (
                    <tr
                      key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                      className={cn(
                        "border-t border-[var(--border)]",
                        clickable
                          ? "cursor-pointer transition-colors hover:bg-[var(--surface2)]"
                          : ""
                      )}
                    >
                      {columns.map((column) => (
                        <td
                          key={`${column.key}-${rowIndex}`}
                          className={cn("px-4 py-3 text-[var(--text)]", column.cellClassName)}
                        >
                          {column.cell(row)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>

      {!loading && rows.length === 0 ? (
        <div className="border-t border-[var(--border)] p-5">
          <EmptyState {...(emptyState ?? defaultEmptyState)} />
        </div>
      ) : null}
    </div>
  );
}

export type { DataTableProps };
