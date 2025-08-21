"use client";
import { useRef, useState } from "react";
import {
  Invoice,
  getInvoices,
  saveInvoices,
  downloadInvoicePDF,
} from "@/lib/invoices";
import { AddInvoiceForm, InvoicePreview } from "./components";
import { DashboardLayout } from "@/layouts";

export default function NewInvoicePage() {
  const [active, setActive] = useState<Invoice | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handleCreate = async (inv: Invoice) => {
    const list = [inv, ...getInvoices()];
    saveInvoices(list);
    setActive(inv);
    await new Promise((r) => setTimeout(r, 30));
    if (printRef.current) {
      await downloadInvoicePDF(
        printRef.current,
        `invoice_${inv.invoiceNumber || inv.id}.pdf`
      );
    }
  };

  return (
    <DashboardLayout>
        <div className="p-6 text-white max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">New Invoice</h1>
      </div>

      <AddInvoiceForm onCreate={handleCreate} />

      <div className="fixed -left-[9999px] top-0">
        {active && <InvoicePreview ref={printRef} invoice={active} />}
      </div>
    </div>
    </DashboardLayout>
  );
}
