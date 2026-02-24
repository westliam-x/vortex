"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { PageHeader } from "@/components/layout";
import { Button, Input, Select, StatusBadge } from "@/components/ui";
import { DataTable, FilterBar, NoResults } from "@/components/patterns";
import { useProjects } from "@/features/projects";
import { usePayments } from "./hooks/usePayments";

export default function Payments() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");
  const [projectId, setProjectId] = useState("");

  const { projects } = useProjects();
  const { payments, loading, fetchPayments } = usePayments(projectId || undefined);

  const filteredEvents = useMemo(() => {
    const term = search.toLowerCase().trim();
    const items = payments.events.filter((event) => {
      const source = (event.note || "manual").toLowerCase();
      const matchesSearch = !term || source.includes(term);
      const matchesStatus = status === "all" || event.status === status;
      return matchesSearch && matchesStatus;
    });

    return items.sort((a, b) => {
      if (sort === "amount") return b.amount - a.amount;
      return new Date(b.occurredAt ?? 0).getTime() - new Date(a.occurredAt ?? 0).getTime();
    });
  }, [payments.events, search, status, sort]);

  const hasFilters = search.trim().length > 0 || status !== "all" || sort !== "recent";
  const showNoResults = !loading && payments.events.length > 0 && filteredEvents.length === 0 && hasFilters;

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" subtitle="Track payment events and project totals." />

      <FilterBar
        searchSlot={
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search payment source"
          />
        }
        filterChipsSlot={
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="posted">Posted</option>
            <option value="void">Void</option>
          </Select>
        }
        sortSlot={
          <Select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="recent">Sort: Recent</option>
            <option value="amount">Sort: Amount</option>
          </Select>
        }
        rightActionsSlot={
          <>
            <Select value={projectId} onChange={(event) => setProjectId(event.target.value)}>
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </Select>
            {hasFilters ? (
              <Button variant="ghost" onClick={() => {
                setSearch("");
                setStatus("all");
                setSort("recent");
              }}>
                Reset
              </Button>
            ) : null}
          </>
        }
      />

      {showNoResults ? (
        <NoResults
          title="No payments match your filters"
          description="Try different filter options or clear your search."
          onReset={() => {
            setSearch("");
            setStatus("all");
            setSort("recent");
          }}
        />
      ) : (
        <DataTable
          columns={[
            { key: "source", header: "Source", cell: (row) => row.note || "Manual entry" },
            {
              key: "amount",
              header: "Amount",
              cell: (row) => new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: row.currency,
              }).format(row.amount),
            },
            { key: "status", header: "Status", cell: (row) => <StatusBadge kind="payment" status={row.status} /> },
            {
              key: "date",
              header: "Date",
              cell: (row) => (row.occurredAt ? format(new Date(row.occurredAt), "dd MMM yyyy") : "-"),
            },
          ]}
          rows={filteredEvents}
          loading={loading}
          loadingRows={6}
          getRowKey={(row, index) => row.id ?? row._id ?? `${row.amount}-${index}`}
          emptyState={{
            title: projectId ? "No payments recorded" : "Select a project",
            description: projectId
              ? "Payment events for this project will appear here."
              : "Choose a project to view payment events.",
            primaryAction: {
              label: projectId ? "Refresh" : "Load selected project",
              onClick: () => {
                if (projectId) void fetchPayments();
              },
              variant: "secondary",
            },
          }}
        />
      )}
    </div>
  );
}
