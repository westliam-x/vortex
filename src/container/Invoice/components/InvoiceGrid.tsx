"use client";
import { Invoice } from "@/lib/invoices";
import InvoiceCard from "./InvoiceCard";


export default function InvoiceGrid({ invoices, onDownload }: { invoices: Invoice[]; onDownload: (inv: Invoice) => void }) {
if (!invoices?.length) {
return (
<div className="border border-[#2F2F41] rounded-lg p-8 text-center text-gray-300">
<p>No invoices yet. Click “New Invoice”.</p>
</div>
);
}


return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
{invoices.map((inv) => (
<InvoiceCard key={inv.id} invoice={inv} onClick={() => onDownload(inv)} />
))}
</div>
);
}