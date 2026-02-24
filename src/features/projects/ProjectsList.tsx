"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { AddProjectModal } from "@/components";
import { PageHeader } from "@/components/layout";
import { Button, Input, Select, StatusBadge } from "@/components/ui";
import { DataTable, FilterBar, NoResults } from "@/components/patterns";
import { getProjectId } from "@/lib/ids";
import { useProjects } from "./hooks/useProjects";
import type { Project } from "@/types/project";

const formatBudget = (project: Project) => {
  if (typeof project.budget !== "number") return "-";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(project.budget);
};

const getClientName = (project: Project) => {
  if (typeof project.clientId === "string") return project.clientId || "-";
  return project.clientId?.name ?? "-";
};

export default function ProjectsList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const { projects, loading, pagination, page, limit, setPage, setLimit } = useProjects();

  const filteredProjects = useMemo(() => {
    const term = search.toLowerCase().trim();
    const items = projects.filter((project) => {
      const matchesSearch =
        !term ||
        project.title.toLowerCase().includes(term) ||
        project.description?.toLowerCase().includes(term) ||
        getClientName(project).toLowerCase().includes(term);
      const matchesStatus = status === "all" || project.status === status;
      return matchesSearch && matchesStatus;
    });

    return items.sort((a, b) => {
      if (sort === "due") {
        const aDue = a.deadline ? new Date(a.deadline).getTime() : Number.MAX_SAFE_INTEGER;
        const bDue = b.deadline ? new Date(b.deadline).getTime() : Number.MAX_SAFE_INTEGER;
        return aDue - bDue;
      }
      if (sort === "budget") {
        return (b.budget ?? 0) - (a.budget ?? 0);
      }
      return new Date(b.updatedAt ?? b.createdAt).getTime() - new Date(a.updatedAt ?? a.createdAt).getTime();
    });
  }, [projects, search, status, sort]);

  const hasFilters = search.trim().length > 0 || status !== "all" || sort !== "recent";
  const showNoResults = !loading && pagination.total > 0 && filteredProjects.length === 0 && hasFilters;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        subtitle="Track delivery, visibility, and approvals across active work."
        primaryAction={{ label: "+ New Project", onClick: () => setShowProjectModal(true) }}
      />

      <FilterBar
        searchSlot={
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search by project, client, or description"
          />
        }
        filterChipsSlot={
          <Select value={status} onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}>
            <option value="all">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </Select>
        }
        sortSlot={
          <Select value={sort} onChange={(event) => {
            setSort(event.target.value);
            setPage(1);
          }}>
            <option value="recent">Sort: Recent</option>
            <option value="due">Sort: Deadline</option>
            <option value="budget">Sort: Budget</option>
          </Select>
        }
        rightActionsSlot={
          hasFilters ? (
            <Button variant="ghost" onClick={() => {
              setSearch("");
              setStatus("all");
              setSort("recent");
              setPage(1);
            }}>
              Reset
            </Button>
          ) : null
        }
      />

      {showNoResults ? (
        <NoResults
          title="No projects match your filters"
          description="Try a different search term or reset filters."
          onReset={() => {
            setSearch("");
            setStatus("all");
            setSort("recent");
          }}
        />
      ) : (
        <DataTable
          columns={[
            { key: "name", header: "Name", cell: (row) => row.title },
            { key: "client", header: "Client", cell: (row) => getClientName(row) },
            { key: "status", header: "Status", cell: (row) => <StatusBadge kind="project" status={row.status} /> },
            {
              key: "deadline",
              header: "Deadline",
              cell: (row) => (row.deadline ? format(new Date(row.deadline), "dd MMM yyyy") : "-"),
            },
            { key: "budget", header: "Budget", cell: (row) => formatBudget(row) },
          ]}
          rows={filteredProjects}
          loading={loading}
          loadingRows={6}
          page={page}
          limit={limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          onLimitChange={setLimit}
          getRowKey={(row) => getProjectId(row) ?? row.title}
          onRowClick={(row) => {
            const id = getProjectId(row);
            if (id) router.push(`/projects/${id}`);
          }}
          emptyState={{
            title: "No projects yet",
            description: "Create your first project to start tracking work.",
            primaryAction: { label: "Create project", onClick: () => setShowProjectModal(true) },
          }}
        />
      )}

      <AddProjectModal isOpen={showProjectModal} onClose={() => setShowProjectModal(false)} />
    </div>
  );
}
