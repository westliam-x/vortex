"use client";
import { AddInvoiceForm } from "./components";
import { DashboardLayout } from "@/layouts";

export default function NewInvoicePage() {
  return (
    <DashboardLayout>
      <div className="md:p-6 p-3 text-white max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">New Invoice</h1>
        </div>

        <AddInvoiceForm />
      </div>
    </DashboardLayout>
  );
}
