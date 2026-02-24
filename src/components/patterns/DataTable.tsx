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
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
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
  page = 1,
  limit = 20,
  total = rows.length,
  totalPages = 1,
  onPageChange,
  onLimitChange,
}: DataTableProps<T>) {
  const canShowPagination = Boolean(onPageChange || onLimitChange);
  const canPrev = page > 1;
  const canNext = page < totalPages;

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

      {canShowPagination ? (
        <div className="flex flex-col gap-3 border-t border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-[var(--muted)]">
            Page {page} of {Math.max(totalPages, 1)} • {total} total
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-[var(--muted)]" htmlFor="table-limit-select">
              Rows
            </label>
            <select
              id="table-limit-select"
              className="rounded-md border border-[var(--border)] bg-[var(--surface2)] px-2 py-1 text-xs text-[var(--text)]"
              value={String(limit)}
              onChange={(event) => onLimitChange?.(Number(event.target.value))}
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="rounded-md border border-[var(--border)] bg-[var(--surface2)] px-2 py-1 text-xs text-[var(--text)] disabled:opacity-50"
              disabled={!canPrev}
              onClick={() => onPageChange?.(page - 1)}
            >
              Prev
            </button>
            <button
              type="button"
              className="rounded-md border border-[var(--border)] bg-[var(--surface2)] px-2 py-1 text-xs text-[var(--text)] disabled:opacity-50"
              disabled={!canNext}
              onClick={() => onPageChange?.(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export type { DataTableProps };
