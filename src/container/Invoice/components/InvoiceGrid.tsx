"use client";
import { Invoice } from "@/lib/invoices";
import InvoiceCard from "./InvoiceCard";
import { EmptyState } from "@/components/ui";

export default function InvoiceGrid({
  invoices,
  onDownload,
  loading,
}: {
  invoices: Invoice[];
  onDownload: (inv: Invoice) => void;
  loading?: boolean;
}) {
  if (loading) {
    return <div className="text-sm text-[var(--text-muted)]">Loading invoices...</div>;
  }
  if (!invoices?.length) {
    return (
      <EmptyState
        title="No invoices yet"
        description="Create a new invoice to get started."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {invoices.map((inv) => (
        <InvoiceCard key={inv.id} invoice={inv} onClick={() => onDownload(inv)} />
      ))}
    </div>
  );
}
