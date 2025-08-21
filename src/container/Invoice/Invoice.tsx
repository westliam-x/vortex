"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Invoice,
  getInvoices,
  saveInvoices,
  downloadInvoicePDF,
} from "@/lib/invoices";
import { InvoiceGrid, InvoicePreview } from "./components";
import { DashboardLayout } from "@/layouts";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [active, setActive] = useState<Invoice | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInvoices(getInvoices());
  }, []);
  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  const triggerDownload = async (inv: Invoice) => {
    setActive(inv);
    await new Promise((r) => setTimeout(r, 30));
    if (printRef.current) {
      await downloadInvoicePDF(
        printRef.current,
        `invoice_${inv.invoiceNumber || inv.id}.pdf`
      );
      setActive(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Link
          href="/invoice/new"
          className="inline-flex items-center gap-2 bg-[#985EFF] hover:bg-[#8851e4] text-white px-4 py-2 rounded-md"
        >
          + New Invoice
        </Link>
      </div>

      <InvoiceGrid invoices={invoices} onDownload={triggerDownload} />

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
