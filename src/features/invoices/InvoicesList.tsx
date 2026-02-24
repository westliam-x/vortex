"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { type Invoice, computeTotals } from "@/lib/invoices";
import { PageHeader } from "@/components/layout";
import { Button, Input, Select, StatusBadge } from "@/components/ui";
import { DataTable, FilterBar, NoResults } from "@/components/patterns";
import { useInvoices } from "./hooks/useInvoices";

const getInvoiceNumber = (invoice: Invoice) => invoice.invoiceNumber || invoice.id;

const getInvoiceStatus = (invoice: Invoice) => {
  if (!invoice.dueDate) return "Draft";
  return new Date(invoice.dueDate).getTime() < Date.now() ? "Overdue" : "Sent";
};

export default function InvoicesList() {
  const router = useRouter();
  const { invoices, loading } = useInvoices();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const auditTimestamp = (invoice: Invoice) => {
    if (invoice.issueDate) return invoice.issueDate;
    return typeof invoice.createdAt === "number"
      ? new Date(invoice.createdAt).toISOString()
      : invoice.createdAt;
  };

  const filteredInvoices = useMemo(() => {
    const term = search.toLowerCase().trim();
    const items = invoices.filter((invoice) => {
      const invoiceNo = getInvoiceNumber(invoice).toLowerCase();
      const client = (invoice.clientName || "").toLowerCase();
      const matchesSearch = !term || invoiceNo.includes(term) || client.includes(term);
      const invoiceStatus = getInvoiceStatus(invoice);
      const matchesStatus = status === "all" || invoiceStatus === status;
      const createdTime = new Date(auditTimestamp(invoice)).getTime();
      const now = Date.now();
      const inLast30Days = now - createdTime <= 1000 * 60 * 60 * 24 * 30;
      const inLast90Days = now - createdTime <= 1000 * 60 * 60 * 24 * 90;
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "30d" && inLast30Days) ||
        (dateFilter === "90d" && inLast90Days);
      return matchesSearch && matchesStatus && matchesDate;
    });

    return items.sort((a, b) => {
      const aUpdated = new Date(auditTimestamp(a)).getTime();
      const bUpdated = new Date(auditTimestamp(b)).getTime();
      return bUpdated - aUpdated;
    });
  }, [dateFilter, invoices, search, status]);

  const resetFilters = () => {
    setSearch("");
    setStatus("all");
    setDateFilter("all");
  };

  const hasFilters = search.trim().length > 0 || status !== "all" || dateFilter !== "all";
  const showNoResults = !loading && invoices.length > 0 && filteredInvoices.length === 0 && hasFilters;

  const columns = [
    { key: "invoice", header: "Invoice", cell: (row: Invoice) => getInvoiceNumber(row) },
    { key: "client", header: "Client", cell: (row: Invoice) => row.clientName || "-" },
    {
      key: "status",
      header: "Status",
      cell: (row: Invoice) => <StatusBadge kind="invoice" status={getInvoiceStatus(row)} />,
    },
    {
      key: "total",
      header: "Total",
      cell: (row: Invoice) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: row.currency,
        }).format(computeTotals(row).total),
    },
    {
      key: "due",
      header: "Due date",
      cell: (row: Invoice) => (row.dueDate ? format(new Date(row.dueDate), "dd MMM yyyy") : "-"),
    },
    {
      key: "updated",
      header: "Updated",
      cell: (row: Invoice) => format(new Date(auditTimestamp(row)), "dd MMM yyyy"),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        subtitle="Track billing, due dates, and collection status."
        primaryAction={{ label: "New invoice", onClick: () => router.push("/invoices/new") }}
      />

      <FilterBar
        searchSlot={
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search invoice number or client"
          />
        }
        filterChipsSlot={
          <>
            <Select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">Status: All</option>
              <option value="Draft">Status: Draft</option>
              <option value="Sent">Status: Sent</option>
              <option value="Overdue">Status: Overdue</option>
            </Select>
            <Select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}>
              <option value="all">Date: All</option>
              <option value="30d">Date: Last 30 days</option>
              <option value="90d">Date: Last 90 days</option>
            </Select>
          </>
        }
        rightActionsSlot={
          hasFilters ? (
            <Button variant="ghost" onClick={resetFilters}>
              Reset
            </Button>
          ) : null
        }
      />

      {showNoResults ? (
        <NoResults
          title="No invoices found"
          description="No records match the current search or filters."
          onReset={resetFilters}
        />
      ) : (
        <DataTable
          columns={columns}
          rows={filteredInvoices}
          loading={loading}
          loadingRows={6}
          getRowKey={(row) => row.id}
          onRowClick={(row) => router.push(`/invoices/${row.id}`)}
          emptyState={{
            title: "No invoices yet",
            description: "Create your first invoice to start billing clients.",
            primaryAction: { label: "Create invoice", onClick: () => router.push("/invoices/new") },
          }}
        />
      )}
    </div>
  );
}
