"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AddClientModal } from "@/components";
import { PageHeader } from "@/components/layout";
import { Button, Input, Select } from "@/components/ui";
import { DataTable, FilterBar, NoResults } from "@/components/patterns";
import { getId } from "@/lib/ids";
import { useClients } from "./hooks/useClients";
import type { Client } from "@/types/client";

export default function ClientsList() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("name");
  const { clients, loading, error, refetch } = useClients();

  const filteredClients = useMemo(() => {
    const term = search.toLowerCase().trim();
    const items = clients.filter((client) => {
      const matchesSearch =
        !term ||
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term);
      const matchesStatus = status === "all" || client.status === status;
      return matchesSearch && matchesStatus;
    });

    return items.sort((a, b) => {
      if (sort === "projects") {
        return b.projects.length - a.projects.length;
      }
      return a.name.localeCompare(b.name);
    });
  }, [clients, search, status, sort]);

  const hasFilters = search.trim().length > 0 || status !== "all" || sort !== "name";
  const showNoResults = !loading && clients.length > 0 && filteredClients.length === 0 && hasFilters;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        subtitle="Keep profiles, project history, and status in one place."
        primaryAction={{ label: "Add Client", onClick: () => setShowModal(true) }}
      />

      <FilterBar
        searchSlot={
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email"
          />
        }
        filterChipsSlot={
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </Select>
        }
        sortSlot={
          <Select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="name">Sort: Name</option>
            <option value="projects">Sort: Projects count</option>
          </Select>
        }
        rightActionsSlot={
          hasFilters ? (
            <Button variant="ghost" onClick={() => {
              setSearch("");
              setStatus("all");
              setSort("name");
            }}>
              Reset
            </Button>
          ) : null
        }
      />

      {error ? (
        <DataTable<Client>
          columns={[
            { key: "name", header: "Name", cell: (row) => row.name },
            { key: "email", header: "Email", cell: (row) => row.email },
            { key: "active", header: "Active", cell: (row) => row.status },
            { key: "projects", header: "Projects count", cell: (row) => row.projects.length },
          ]}
          rows={[]}
          emptyState={{
            title: "Unable to load clients",
            description: "Check your connection and try again.",
            primaryAction: { label: "Retry", onClick: refetch },
          }}
        />
      ) : showNoResults ? (
        <NoResults
          title="No clients match your filters"
          description="Adjust search or reset filters."
          onReset={() => {
            setSearch("");
            setStatus("all");
            setSort("name");
          }}
        />
      ) : (
        <DataTable<Client>
          columns={[
            { key: "name", header: "Name", cell: (row) => row.name },
            { key: "email", header: "Email", cell: (row) => row.email },
            { key: "active", header: "Active", cell: (row) => row.status },
            { key: "projects", header: "Projects count", cell: (row) => row.projects.length },
          ]}
          rows={filteredClients}
          loading={loading}
          loadingRows={6}
          getRowKey={(row) => getId(row) ?? row.email}
          onRowClick={(row) => {
            const id = getId(row);
            if (id) router.push(`/clients/${id}`);
          }}
          emptyState={{
            title: "No clients yet",
            description: "Add your first client to start managing relationships.",
            primaryAction: { label: "Add Client", onClick: () => setShowModal(true) },
          }}
        />
      )}

      <AddClientModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
