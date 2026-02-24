"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Invoice, downloadInvoicePDF } from "@/lib/invoices";
import { InvoiceGrid, InvoicePreview } from "./components";
import { useInvoices } from "./hooks/useInvoices";
import { PageHeader } from "@/components/layout";

export default function InvoicesList() {
  const router = useRouter();
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
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        subtitle="Create, download, and share invoices with clients."
        primaryAction={{
          label: "+ New Invoice",
          onClick: () => router.push("/invoices/new"),
        }}
      />

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
