"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { PageHeader } from "@/components/layout";
import { Button, Input, Select, StatusBadge } from "@/components/ui";
import { DataTable, FilterBar, NoResults } from "@/components/patterns";
import { useProjects } from "@/features/projects";
import type { Project } from "@/types/project";
import { getProjectId } from "@/lib/ids";

type SpaceRow = {
  id: string;
  project: string;
  linkStatus: "Enabled" | "Disabled";
  lastActivity: string;
};

const toSpace = (project: Project): SpaceRow | null => {
  const id = getProjectId(project);
  if (!id) return null;
  return {
    id,
    project: project.title,
    linkStatus: project.isPublic ? "Enabled" : "Disabled",
    lastActivity: project.updatedAt ?? project.createdAt,
  };
};

export default function SpacesList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [linkStatus, setLinkStatus] = useState("all");
  const [sort, setSort] = useState("recent");
  const { projects, loading, pagination, page, limit, setPage, setLimit } = useProjects();

  const spaces = useMemo(() => projects.map(toSpace).filter((item): item is SpaceRow => item !== null), [projects]);

  const filteredSpaces = useMemo(() => {
    const term = search.toLowerCase().trim();
    const items = spaces.filter((space) => {
      const matchesSearch = !term || space.project.toLowerCase().includes(term);
      const matchesStatus = linkStatus === "all" || space.linkStatus === linkStatus;
      return matchesSearch && matchesStatus;
    });

    return items.sort((a, b) => {
      if (sort === "project") return a.project.localeCompare(b.project);
      return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
    });
  }, [spaces, search, linkStatus, sort]);

  const hasFilters = search.trim().length > 0 || linkStatus !== "all" || sort !== "recent";
  const showNoResults = !loading && pagination.total > 0 && filteredSpaces.length === 0 && hasFilters;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Spaces"
        subtitle="Owner list of active project share spaces."
      />

      <FilterBar
        searchSlot={
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search by project name"
          />
        }
        filterChipsSlot={
          <Select value={linkStatus} onChange={(event) => {
            setLinkStatus(event.target.value);
            setPage(1);
          }}>
            <option value="all">All links</option>
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </Select>
        }
        sortSlot={
          <Select value={sort} onChange={(event) => {
            setSort(event.target.value);
            setPage(1);
          }}>
            <option value="recent">Sort: Recent activity</option>
            <option value="project">Sort: Project</option>
          </Select>
        }
        rightActionsSlot={
          hasFilters ? (
            <Button variant="ghost" onClick={() => {
              setSearch("");
              setLinkStatus("all");
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
          title="No spaces match your filters"
          description="Try clearing filters or use a broader query."
          onReset={() => {
            setSearch("");
            setLinkStatus("all");
            setSort("recent");
          }}
        />
      ) : (
        <DataTable
          columns={[
            { key: "project", header: "Project", cell: (row) => row.project },
            { key: "status", header: "Link status", cell: (row) => <StatusBadge kind="space" status={row.linkStatus} /> },
            {
              key: "activity",
              header: "Last activity",
              cell: (row) => format(new Date(row.lastActivity), "dd MMM yyyy"),
            },
          ]}
          rows={filteredSpaces}
          loading={loading}
          loadingRows={6}
          page={page}
          limit={limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          onLimitChange={setLimit}
          getRowKey={(row) => row.id}
          onRowClick={(row) => router.push(`/spaces/${row.id}`)}
          emptyState={{
            title: "No spaces yet",
            description: "Enable sharing on a project to create a space.",
            primaryAction: {
              label: "Go to projects",
              onClick: () => router.push("/projects"),
            },
          }}
        />
      )}
    </div>
  );
}
