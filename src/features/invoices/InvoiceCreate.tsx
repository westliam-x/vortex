"use client";

import { AddInvoiceForm } from "./components";

export default function InvoiceCreate() {
  return (
    <div className="mx-auto max-w-7xl p-3 text-[var(--text)] md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[var(--text)]">New Invoice</h1>
      </div>

      <AddInvoiceForm />
    </div>
  );
}
