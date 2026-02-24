"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { PageHeader, ContentGrid, RightContextPanel } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import { Button, EmptyState, StatusBadge } from "@/components/ui";
import { computeTotals, downloadInvoicePDF, formatMoney } from "@/lib/invoices";
import { PaymentEventsDrawer } from "@/features/payments";
import { useInvoices } from "./hooks/useInvoices";
import InvoicePreview from "./components/InvoicePreview";

export default function InvoiceDetails() {
  const router = useRouter();
  const { id } = useParams();
  const invoiceId = typeof id === "string" ? id : undefined;
  const { invoices, loading } = useInvoices();
  const printRef = useRef<HTMLDivElement>(null);
  const [paymentsDrawerOpen, setPaymentsDrawerOpen] = useState(false);

  const invoice = useMemo(() => invoices.find((item) => item.id === invoiceId), [invoices, invoiceId]);

  const status = useMemo(() => {
    if (!invoice?.dueDate) return "Draft";
    return new Date(invoice.dueDate).getTime() < Date.now() ? "Overdue" : "Sent";
  }, [invoice?.dueDate]);

  if (!loading && !invoice) {
    return (
      <EmptyState
        title="Invoice not found"
        description="The invoice could not be found or may have been removed."
        action={
          <Link href="/invoices">
            <Button variant="secondary">Back to invoices</Button>
          </Link>
        }
      />
    );
  }

  const totals = invoice ? computeTotals(invoice) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={invoice ? `Invoice #${invoice.invoiceNumber || invoice.id}` : "Invoice"}
        subtitle={invoice?.businessName ?? "Invoice details"}
        secondaryActions={[{ label: "Back to invoices", variant: "outline", onClick: () => router.push("/invoices") }]}
      />

      <ContentGrid
        main={
          <div className="space-y-4">
            <SectionCard title="Recipient">
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <p className="text-[var(--muted)]">Client</p>
                  <p className="text-[var(--text)]">{invoice?.clientName || "-"}</p>
                </div>
                <div>
                  <p className="text-[var(--muted)]">Email</p>
                  <p className="text-[var(--text)]">{invoice?.clientEmail || "-"}</p>
                </div>
                <div>
                  <p className="text-[var(--muted)]">Recipient email</p>
                  <p className="text-[var(--text)]">{invoice?.clientEmail || "-"}</p>
                </div>
                <div>
                  <p className="text-[var(--muted)]">Recipient phone</p>
                  <p className="text-[var(--text)]">{invoice?.clientPhone || "-"}</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Line Items">
              <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
                <table className="min-w-full text-sm">
                  <thead className="bg-[var(--surface2)] text-[var(--muted)]">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs uppercase tracking-wide">Description</th>
                      <th className="px-4 py-2 text-left text-xs uppercase tracking-wide">Qty</th>
                      <th className="px-4 py-2 text-left text-xs uppercase tracking-wide">Rate</th>
                      <th className="px-4 py-2 text-left text-xs uppercase tracking-wide">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice?.items?.map((item, index) => (
                      <tr key={`${item.description}-${index}`} className="border-t border-[var(--border)]">
                        <td className="px-4 py-3 text-[var(--text)]">{item.description}</td>
                        <td className="px-4 py-3 text-[var(--text)]">{item.quantity}</td>
                        <td className="px-4 py-3 text-[var(--text)]">{formatMoney(item.rate, invoice.currency)}</td>
                        <td className="px-4 py-3 text-[var(--text)]">
                          {formatMoney(item.quantity * item.rate, invoice.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="Notes">
              <p className="text-sm text-[var(--muted)]">{invoice?.notes || "No notes provided."}</p>
            </SectionCard>
          </div>
        }
        right={
          <RightContextPanel>
            <SectionCard title="Status">
              <StatusBadge kind="invoice" status={status} />
            </SectionCard>

            <SectionCard title="Totals">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--muted)]">Subtotal</dt>
                  <dd className="text-[var(--text)]">{invoice && totals ? formatMoney(totals.sub, invoice.currency) : "-"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--muted)]">Tax</dt>
                  <dd className="text-[var(--text)]">{invoice && totals ? formatMoney(totals.tax, invoice.currency) : "-"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--muted)]">Discount</dt>
                  <dd className="text-[var(--text)]">{invoice && totals ? formatMoney(totals.discount, invoice.currency) : "-"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--muted)]">Total</dt>
                  <dd className="text-[var(--text)]">{invoice && totals ? formatMoney(totals.total, invoice.currency) : "-"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--muted)]">Due date</dt>
                  <dd className="text-[var(--text)]">
                    {invoice?.dueDate ? format(new Date(invoice.dueDate), "dd MMM yyyy") : "-"}
                  </dd>
                </div>
              </dl>
            </SectionCard>

            <SectionCard title="Actions">
              <div className="space-y-2">
                <Button
                  fullWidth
                  variant="secondary"
                  onClick={() => toast.info("Send action is a UI placeholder.")}
                >
                  Send
                </Button>
                <Button
                  fullWidth
                  onClick={() => {
                    if (!invoice) return;
                    void downloadInvoicePDF(invoice);
                  }}
                >
                  Download PDF
                </Button>
                <Button
                  fullWidth
                  variant="outline"
                  onClick={() => setPaymentsDrawerOpen(true)}
                >
                  View payments
                </Button>
              </div>
            </SectionCard>
          </RightContextPanel>
        }
      />

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
        {invoice ? <InvoicePreview ref={printRef} invoice={invoice} /> : null}
      </div>

      <PaymentEventsDrawer
        open={paymentsDrawerOpen}
        onOpenChange={setPaymentsDrawerOpen}
        invoiceId={invoiceId}
      />
    </div>
  );
}
