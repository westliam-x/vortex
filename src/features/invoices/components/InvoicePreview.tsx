"use client";
import React from "react";
import { Invoice, formatMoney } from "@/lib/invoices";

const InvoicePreview = React.forwardRef<HTMLDivElement, { invoice: Invoice }>(
  ({ invoice }, ref) => {
    const sub = invoice.items.reduce((s, it) => s + it.quantity * it.rate, 0);
    const tax = invoice.taxPercent ? (sub * invoice.taxPercent) / 100 : 0;
    const discount = invoice.discount || 0;
    const total = Math.max(0, sub + tax - discount);

    return (
      <div ref={ref} className="w-[794px] bg-white text-black p-8 font-sans">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">INVOICE</h2>
            <p className="text-sm">#{invoice.invoiceNumber || invoice.id}</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">{invoice.yourName}</p>
            {invoice.yourEmail && <p>{invoice.yourEmail}</p>}
            {invoice.yourPhone && <p>{invoice.yourPhone}</p>}
            {invoice.yourAddress && <p>{invoice.yourAddress}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm mb-6">
          <div>
            <p className="font-semibold">Bill To</p>
            <p>{invoice.businessName}</p>
            {invoice.clientName && <p>{invoice.clientName}</p>}
            {invoice.clientEmail && <p>{invoice.clientEmail}</p>}
            {invoice.clientPhone && <p>{invoice.clientPhone}</p>}
          </div>
          <div className="text-right">
            {invoice.issueDate && <p>Issue Date: {invoice.issueDate}</p>}
            {invoice.dueDate && <p>Due Date: {invoice.dueDate}</p>}
            <p>Currency: {invoice.currency}</p>
          </div>
        </div>

        {invoice.customFields?.length ? (
          <div className="mb-4 text-sm">
            <p className="font-semibold mb-1">Details</p>
            <div className="grid grid-cols-2 gap-2">
              {invoice.customFields.map((f, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-gray-200 py-1"
                >
                  <span className="font-medium">{f.label}</span>
                  <span>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <table className="w-full text-sm border-t border-b border-gray-300 my-6">
          <thead>
            <tr className="text-left">
              <th className="py-2">Description</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((it, idx) => (
              <tr key={idx} className="border-t border-gray-200">
                <td className="py-2 pr-2">{it.description}</td>
                <td>{it.quantity}</td>
                <td>{formatMoney(it.rate, invoice.currency)}</td>
                <td>{formatMoney(it.quantity * it.rate, invoice.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            {invoice.notes && (
              <div className="mb-3">
                <p className="font-semibold">Notes</p>
                <p className="whitespace-pre-wrap">{invoice.notes}</p>
              </div>
            )}
            {invoice.terms && (
              <div>
                <p className="font-semibold">Terms</p>
                <p className="whitespace-pre-wrap">{invoice.terms}</p>
              </div>
            )}
          </div>
          <div className="text-right">
            <p>Subtotal: {formatMoney(sub, invoice.currency)}</p>
            <p>
              Tax ({invoice.taxPercent || 0}%):{" "}
              {formatMoney(tax, invoice.currency)}
            </p>
            <p>Discount: {formatMoney(discount, invoice.currency)}</p>
            <p className="text-lg font-bold mt-2">
              Total: {formatMoney(total, invoice.currency)}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = "InvoicePreview";
export default InvoicePreview;
