"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Invoice, downloadInvoicePDF } from "@/lib/invoices";
import { InvoiceGrid, InvoicePreview } from "./components";
import { useInvoices } from "./hooks/useInvoices";

export default function InvoicesList() {
  const { invoices, loading } = useInvoices();
  const [active, setActive] = useState<Invoice | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const triggerDownload = async (inv: Invoice) => {
    setActive(inv);
    await new Promise((r) => setTimeout(r, 30));
    if (printRef.current) {
      await downloadInvoicePDF(inv);
      setActive(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text)]">Invoices</h1>
          <p className="text-sm text-[var(--text-muted)]">
            Create, download, and share invoices with clients.
          </p>
        </div>
        <Link
          href="/invoices/new"
          className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-strong)] px-4 py-2 text-[#041017] hover:bg-[var(--accent)]"
        >
          + New Invoice
        </Link>
      </div>

      <InvoiceGrid invoices={invoices} onDownload={triggerDownload} loading={loading} />

      <div
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        {active ? <InvoicePreview ref={printRef} invoice={active} /> : null}
      </div>
    </div>
  );
}
