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
      className="w-full text-left bg-[#090909] p-4 border border-[#2F2F41] rounded-lg hover:border-[#985EFF] transition"
      title="Click to download invoice PDF"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {invoice.businessName}
          </h2>
          <p className="text-sm text-gray-400">
            Invoice #{invoice.invoiceNumber || invoice.id}
          </p>
          {invoice.clientName && (
            <p className="text-sm text-gray-400 mt-1">
              Bill To: {invoice.clientName}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-white font-semibold">
            {formatMoney(total, invoice.currency)}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(invoice.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 text-sm text-gray-300">
        <Download className="w-4 h-4" /> Click card to download
      </div>
    </button>
  );
}
