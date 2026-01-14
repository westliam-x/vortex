"use client";

import { Project } from "@/types/project";
import { useMemo } from "react";
import { Badge, Card, EmptyState, Skeleton } from "@/components/ui";
import { useProjectsList } from "@/hooks/projects/useProjectsList";

const statusTone = (status: Project["status"]) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "warning";
    case "Pending":
      return "info";
    case "Archived":
      return "default";
    default:
      return "default";
  }
};

const ProjectOverview = () => {
  const { projects, loading } = useProjectsList();
  const latestProjects = useMemo(() => projects.slice(0, 6), [projects]);

  return (
    <Card>
      <h2 className="text-[var(--text)] text-lg font-semibold mb-5">
        Latest projects
      </h2>

      {loading ? (
        <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="min-w-[240px] h-24" />
          ))}
        </div>
      ) : latestProjects.length > 0 ? (
        <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
          {latestProjects.map((project) => (
            <div
              key={project.id}
              className="min-w-[260px] rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4"
            >
              <h3 className="text-base font-medium text-[var(--text)]">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] truncate">
                Client:{" "}
                {typeof project.clientId === "object" &&
                project.clientId &&
                "name" in project.clientId
                  ? project.clientId.name
                  : "Client"}
              </p>

              <div className="mt-3">
                <Badge tone={statusTone(project.status)}>{project.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects yet"
          description="Create a project to start your first Vortex space."
        />
      )}
    </Card>
  );
};

export default ProjectOverview;
