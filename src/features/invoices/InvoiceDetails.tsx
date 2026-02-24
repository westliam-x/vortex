"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { PageHeader, ContentGrid, RightContextPanel } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import { Button, EmptyState, Input, Modal, Select, StatusBadge } from "@/components/ui";
import { computeTotals, downloadInvoicePDF, formatMoney } from "@/lib/invoices";
import { PaymentEventsDrawer, usePayments } from "@/features/payments";
import { BLAAIZ_UNAVAILABLE, createBlaaizCollection } from "@/features/integrations";
import { useInvoices } from "./hooks/useInvoices";
import InvoicePreview from "./components/InvoicePreview";

export default function InvoiceDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const invoiceId = typeof id === "string" ? id : undefined;
  const { invoices, loading, refetch } = useInvoices();
  const printRef = useRef<HTMLDivElement>(null);
  const [paymentsDrawerOpen, setPaymentsDrawerOpen] = useState(false);
  const [collectOpen, setCollectOpen] = useState(false);
  const [collectLoading, setCollectLoading] = useState(false);
  const [collectError, setCollectError] = useState<string | null>(null);
  const [collectForm, setCollectForm] = useState({
    amount: "",
    currency: "USD",
    method: "card",
    customerEmail: "",
    customerPhone: "",
    customerName: "",
    walletId: "",
  });

  const invoice = useMemo(() => invoices.find((item) => item.id === invoiceId), [invoices, invoiceId]);
  const totals = useMemo(() => (invoice ? computeTotals(invoice) : null), [invoice]);
  const projectId = useMemo(() => {
    const raw = (invoice as { projectId?: string | { _id?: string } } | undefined)?.projectId;
    if (!raw) return undefined;
    if (typeof raw === "string") return raw;
    return raw._id;
  }, [invoice]);

  const status = useMemo(() => {
    const paymentStatus = (invoice as { paymentStatus?: string } | undefined)?.paymentStatus;
    if (paymentStatus) return paymentStatus;
    if (!invoice?.dueDate) return "Draft";
    return new Date(invoice.dueDate).getTime() < Date.now() ? "Overdue" : "Sent";
  }, [invoice]);

  const { payments, fetchPayments } = usePayments(projectId, totals?.total ?? 0);

  const paidAmount = useMemo(
    () => payments.events.reduce((sum, event) => (event.status === "posted" ? sum + event.amount : sum), 0),
    [payments.events]
  );

  const outstandingAmount = useMemo(() => {
    const invoiceTotal = totals?.total ?? 0;
    return Math.max(0, invoiceTotal - paidAmount);
  }, [paidAmount, totals?.total]);

  useEffect(() => {
    if (!invoice) return;
    setCollectForm({
      amount: String(Math.max(0, outstandingAmount || totals?.total || 0)),
      currency: invoice.currency,
      method: "card",
      customerEmail: invoice.clientEmail ?? "",
      customerPhone: invoice.clientPhone ?? "",
      customerName: invoice.clientName ?? "",
      walletId: "",
    });
    setCollectError(null);
  }, [invoice, outstandingAmount, totals?.total]);

  const hasRedirectSignal = useMemo(() => {
    return ["reference", "tx_ref", "status", "paymentStatus", "collection_id"].some((key) => {
      const value = searchParams.get(key);
      return Boolean(value);
    });
  }, [searchParams]);

  useEffect(() => {
    if (!projectId || !hasRedirectSignal) return;
    let runs = 0;
    void fetchPayments();
    const interval = window.setInterval(() => {
      runs += 1;
      void fetchPayments();
      if (runs >= 6) {
        window.clearInterval(interval);
      }
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [fetchPayments, hasRedirectSignal, projectId]);

  const handleCollectPayment = async () => {
    if (!invoice || !projectId) {
      setCollectError("Project link missing on this invoice.");
      return;
    }

    const amount = Number(collectForm.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setCollectError("Enter a valid amount.");
      return;
    }

    setCollectLoading(true);
    setCollectError(null);
    try {
      const response = await createBlaaizCollection({
        projectId,
        invoiceId: invoice.id,
        customer: {
          email: collectForm.customerEmail,
          phone: collectForm.customerPhone,
          name: collectForm.customerName || invoice.clientName || "Client",
        },
        walletId: collectForm.walletId || projectId,
        amount,
        currency: collectForm.currency,
        method: collectForm.method,
        reference: `${invoice.invoiceNumber || invoice.id}-${Date.now()}`,
      });

      if (!response.payment_url) {
        setCollectError("Unable to start payment collection right now.");
        return;
      }

      await refetch();
      window.location.assign(response.payment_url);
    } catch (error) {
      if (error instanceof Error && error.name === BLAAIZ_UNAVAILABLE) {
        setCollectError("Service unavailable. Retry soon.");
      } else {
        setCollectError(error instanceof Error ? error.message : "Unable to start payment collection.");
      }
    } finally {
      setCollectLoading(false);
    }
  };

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
                  <dt className="text-[var(--muted)]">Paid</dt>
                  <dd className="text-[var(--text)]">
                    {invoice ? formatMoney(paidAmount, invoice.currency) : "-"}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--muted)]">Outstanding</dt>
                  <dd className="text-[var(--text)]">
                    {invoice ? formatMoney(outstandingAmount, invoice.currency) : "-"}
                  </dd>
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
                <Button
                  fullWidth
                  variant="primary"
                  onClick={() => setCollectOpen(true)}
                >
                  Collect payment
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

      <Modal
        open={collectOpen}
        onClose={() => {
          if (collectLoading) return;
          setCollectOpen(false);
        }}
        title="Collect payment"
        description="Create a hosted payment request with Blaaiz."
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-[var(--muted)]">Amount</label>
              <Input
                type="number"
                min="1"
                value={collectForm.amount}
                onChange={(event) => setCollectForm((prev) => ({ ...prev, amount: event.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-[var(--muted)]">Currency</label>
              <Select
                value={collectForm.currency}
                onChange={(event) => setCollectForm((prev) => ({ ...prev, currency: event.target.value }))}
              >
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-[var(--muted)]">Method</label>
            <Select
              value={collectForm.method}
              onChange={(event) => setCollectForm((prev) => ({ ...prev, method: event.target.value }))}
            >
              <option value="card">Card</option>
              <option value="bank_transfer">Bank transfer</option>
              <option value="ussd">USSD</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-[var(--muted)]">Customer email</label>
              <Input
                type="email"
                value={collectForm.customerEmail}
                onChange={(event) =>
                  setCollectForm((prev) => ({ ...prev, customerEmail: event.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-[var(--muted)]">Customer phone</label>
              <Input
                value={collectForm.customerPhone}
                onChange={(event) =>
                  setCollectForm((prev) => ({ ...prev, customerPhone: event.target.value }))
                }
              />
            </div>
          </div>

          {collectError ? (
            <p className="rounded-md border border-[var(--danger)] bg-[var(--surface2)] px-3 py-2 text-sm text-[var(--danger)]">
              {collectError}
            </p>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setCollectOpen(false)} disabled={collectLoading}>
              Cancel
            </Button>
            <Button onClick={() => void handleCollectPayment()} loading={collectLoading}>
              Continue to payment
            </Button>
          </div>
        </div>
      </Modal>

      <PaymentEventsDrawer
        open={paymentsDrawerOpen}
        onOpenChange={setPaymentsDrawerOpen}
        invoiceId={invoiceId}
        projectId={projectId}
      />
    </div>
  );
}
