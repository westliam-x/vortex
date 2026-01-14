"use client";
import { Invoice, formatMoney } from "@/lib/invoices";
import { Download } from "lucide-react";

export default function InvoiceCard({
  invoice,
  onClick,
}: {
  invoice: Invoice;
  onClick: () => void;
}) {
  const sub = invoice.items.reduce((s, it) => s + it.quantity * it.rate, 0);
  const tax = invoice.taxPercent ? (sub * invoice.taxPercent) / 100 : 0;
  const discount = invoice.discount || 0;
  const total = Math.max(0, sub + tax - discount);

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-[var(--surface)] p-4 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition"
      title="Click to download invoice PDF"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text)]">
            {invoice.businessName}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Invoice #{invoice.invoiceNumber || invoice.id}
          </p>
          {invoice.clientName ? (
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Bill To: {invoice.clientName}
            </p>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-[var(--text)] font-semibold">
            {formatMoney(total, invoice.currency)}
          </p>
          <p className="text-xs text-[var(--text-subtle)]">
            {new Date(invoice.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 text-sm text-[var(--text-muted)]">
        <Download className="w-4 h-4" /> Click card to download
      </div>
    </button>
  );
}
