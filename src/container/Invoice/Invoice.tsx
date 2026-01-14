"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Invoice,
  downloadInvoicePDF,
} from "@/lib/invoices";
import { InvoiceGrid, InvoicePreview } from "./components";
import { DashboardLayout } from "@/layouts";
import { useInvoices } from "@/hooks/invoices/useInvoices";

export default function InvoicesPage() {
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
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text)]">Invoices</h1>
          <p className="text-sm text-[var(--text-muted)]">
            Create, download, and share invoices with clients.
          </p>
        </div>
        <Link
          href="/invoice/new"
          className="inline-flex items-center gap-2 bg-[var(--accent-strong)] hover:bg-[var(--accent)] text-[#041017] px-4 py-2 rounded-md"
        >
          + New Invoice
        </Link>
      </div>

      <InvoiceGrid invoices={invoices} onDownload={triggerDownload} loading={loading} />

      {/* hidden print area (no off-screen negative positions) */}
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
        {active && (
          <InvoicePreview
            /* or InvoicePreviewSafe */ ref={printRef}
            invoice={active}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
