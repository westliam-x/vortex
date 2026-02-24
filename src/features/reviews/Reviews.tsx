"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { PageHeader } from "@/components/layout";
import { Badge, Button, Input, Select, StatusBadge } from "@/components/ui";
import { DataTable, EmptyState, FilterBar, NoResults } from "@/components/patterns";
import { useReviews } from "./hooks/useReviews";
import { useProjects } from "@/features/projects";

const resolveProjectName = (project: { id: string; name: string } | string) => {
  if (typeof project === "string") return project;
  return project.name;
};

const resolveProjectId = (project: { id: string; name: string } | string) => {
  if (typeof project === "string") return project;
  return project.id;
};

export default function Reviews() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");

  const { reviews, loading } = useReviews();
  const { projects } = useProjects();
  const projectClosed = projects.some((project) => project.status === "Completed");
  const projectClientMap = useMemo(() => {
    const map = new Map<string, string>();
    projects.forEach((project) => {
      const projectKey = project.id ?? project._id;
      if (!projectKey) return;
      const client =
        typeof project.clientId === "object" && project.clientId && "name" in project.clientId
          ? project.clientId.name
          : undefined;
      if (client) map.set(projectKey, client);
    });
    return map;
  }, [projects]);

  const resolveClientName = (review: (typeof reviews)[number]) => {
    if (review.clientName) return review.clientName;
    const projectId = resolveProjectId(review.projectId);
    return projectClientMap.get(projectId) ?? review.clientId ?? "-";
  };

  const filteredReviews = useMemo(() => {
    const term = search.toLowerCase().trim();
    const items = reviews.filter((review) => {
      const project = resolveProjectName(review.projectId).toLowerCase();
      const matchesSearch = !term || project.includes(term) || review.comment.toLowerCase().includes(term);
      const matchesStatus = status === "all" || review.status === status;
      return matchesSearch && matchesStatus;
    });

    return items.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [reviews, search, status, sort]);

  const hasFilters = search.trim().length > 0 || status !== "all" || sort !== "recent";
  const showNoResults = !loading && reviews.length > 0 && filteredReviews.length === 0 && hasFilters;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews"
        subtitle="Collect and track project reviews after delivery completion."
      />

      {!projectClosed ? (
        <EmptyState
          title="Reviews are locked"
          description="Close at least one project to unlock review collection."
          primaryAction={{ label: "Go to projects", onClick: () => router.push("/projects") }}
          secondaryAction={{
            label: "View dashboard",
            variant: "secondary",
            onClick: () => router.push("/dashboard"),
          }}
          icon={null}
        />
      ) : (
        <>
          <FilterBar
            searchSlot={
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by project or review text"
              />
            }
            filterChipsSlot={
              <Select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="all">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Select>
            }
            sortSlot={
              <Select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="recent">Sort: Recent</option>
                <option value="rating">Sort: Rating</option>
              </Select>
            }
            rightActionsSlot={
              hasFilters ? (
                <Button variant="ghost" onClick={() => {
                  setSearch("");
                  setStatus("all");
                  setSort("recent");
                }}>
                  Reset
                </Button>
              ) : null
            }
          />

          {showNoResults ? (
            <NoResults
              title="No reviews match your filters"
              description="Adjust search or clear filters to see more reviews."
              onReset={() => {
                setSearch("");
                setStatus("all");
                setSort("recent");
              }}
            />
          ) : (
            <DataTable
              columns={[
                { key: "project", header: "Project", cell: (row) => resolveProjectName(row.projectId) },
                { key: "client", header: "Client", cell: (row) => resolveClientName(row) },
                { key: "rating", header: "Rating", cell: (row) => `${row.rating}/5` },
                {
                  key: "status",
                  header: "Status",
                  cell: (row) =>
                    row.featured ? (
                      <Badge tone="success">Published</Badge>
                    ) : (
                      <StatusBadge kind="review" status={row.status} />
                    ),
                },
                {
                  key: "created",
                  header: "Created date",
                  cell: (row) => format(new Date(row.createdAt), "dd MMM yyyy"),
                },
                {
                  key: "actions",
                  header: "Actions",
                  cell: (row) => (
                    <div className="flex gap-2">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={(event) => {
                          event.stopPropagation();
                          router.push(`/projects/${resolveProjectId(row.projectId)}`);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        size="xs"
                        variant="secondary"
                        disabled={row.status !== "Pending"}
                        onClick={(event) => {
                          event.stopPropagation();
                          toast.info("Approve action is ready for API wiring.");
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="xs"
                        variant="outline"
                        disabled={row.status !== "Pending"}
                        onClick={(event) => {
                          event.stopPropagation();
                          toast.info("Reject action is ready for API wiring.");
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  ),
                },
              ]}
              rows={filteredReviews}
              loading={loading}
              loadingRows={6}
              getRowKey={(row) => row.id}
              onRowClick={(row) => router.push(`/projects/${resolveProjectId(row.projectId)}`)}
              emptyState={{
                title: "No reviews yet",
                description: "Reviews will appear here after clients submit feedback.",
                primaryAction: {
                  label: "View projects",
                  onClick: () => router.push("/projects"),
                },
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
