"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { InviteUserModal } from "@/components";
import { PageHeader } from "@/components/layout";
import { Badge, Button, Input, Select } from "@/components/ui";
import { DataTable, FilterBar, NoResults } from "@/components/patterns";
import { useFeature } from "@/hooks/useFeature";
import { useTeam } from "./hooks/useTeam";
import type { TeamMember } from "@/types/team";

export default function Team() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("name");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { enabled: teamLimitEnabled } = useFeature("teamLimit");

  const { team, loading, error, refetch, pagination, page, limit, setPage, setLimit } = useTeam();

  const filteredTeam = useMemo(() => {
    const term = search.toLowerCase().trim();
    const items = team.filter((member) => {
      const matchesSearch =
        !term ||
        member.name.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term);
      const matchesStatus = status === "all" || member.status === status;
      return matchesSearch && matchesStatus;
    });

    return items.sort((a, b) => {
      if (sort === "joined") return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
      return a.name.localeCompare(b.name);
    });
  }, [team, search, status, sort]);

  const hasFilters = search.trim().length > 0 || status !== "all" || sort !== "name";
  const showNoResults = !loading && pagination.total > 0 && filteredTeam.length === 0 && hasFilters;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team"
        subtitle="Manage access levels and assignments across your workspace."
        rightSlot={teamLimitEnabled ? undefined : <Badge tone="info">Pro</Badge>}
        primaryAction={{ label: "+ Invite member", onClick: () => setShowInviteModal(true) }}
      />

      <FilterBar
        searchSlot={
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email"
          />
        }
        filterChipsSlot={
          <Select value={status} onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}>
            <option value="all">All statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </Select>
        }
        sortSlot={
          <Select value={sort} onChange={(event) => {
            setSort(event.target.value);
            setPage(1);
          }}>
            <option value="name">Sort: Name</option>
            <option value="joined">Sort: Joined date</option>
          </Select>
        }
        rightActionsSlot={
          hasFilters ? (
            <Button variant="ghost" onClick={() => {
              setSearch("");
              setStatus("all");
              setSort("name");
              setPage(1);
            }}>
              Reset
            </Button>
          ) : null
        }
      />

      {error ? (
        <DataTable<TeamMember>
          columns={[
            { key: "member", header: "Member", cell: (row) => row.name },
            { key: "role", header: "Role", cell: (row) => row.role },
            { key: "status", header: "Status", cell: (row) => row.status },
            { key: "joined", header: "Joined date", cell: (row) => format(new Date(row.joinedAt), "dd MMM yyyy") },
          ]}
          rows={[]}
          emptyState={{
            title: "Unable to load team",
            description: "Please retry to fetch team members.",
            primaryAction: { label: "Retry", onClick: () => void refetch() },
          }}
        />
      ) : showNoResults ? (
        <NoResults
          title="No team members match your filters"
          description="Adjust your filters or clear search criteria."
          onReset={() => {
            setSearch("");
            setStatus("all");
            setSort("name");
          }}
        />
      ) : (
        <DataTable<TeamMember>
          columns={[
            { key: "member", header: "Member", cell: (row) => `${row.name} (${row.email})` },
            { key: "role", header: "Role", cell: (row) => row.role },
            { key: "status", header: "Status", cell: (row) => row.status },
            { key: "joined", header: "Joined date", cell: (row) => format(new Date(row.joinedAt), "dd MMM yyyy") },
          ]}
          rows={filteredTeam}
          loading={loading}
          loadingRows={6}
          page={page}
          limit={limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          onLimitChange={setLimit}
          getRowKey={(row) => row.id}
          emptyState={{
            title: "No team members yet",
            description: "Invite your first collaborator to get started.",
            primaryAction: { label: "Invite member", onClick: () => setShowInviteModal(true) },
          }}
        />
      )}

      <InviteUserModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={() => undefined}
      />
    </div>
  );
}
