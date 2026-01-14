"use client";

import { useMemo, useState } from "react";
import { ProjectGrid, ProjectHeader } from "./components";
import { DashboardLayout } from "@/layouts";
import { Skeleton } from "@/components/ui";
import { useProjectsList } from "@/hooks/projects/useProjectsList";

const ProjectPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");
  const { projects, loading } = useProjectsList();

  const filteredProjects = useMemo(() => {
    const normalized = search.toLowerCase().trim();
    const filtered = projects.filter((project) => {
      const matchesSearch =
        !normalized ||
        project.title.toLowerCase().includes(normalized) ||
        project.description?.toLowerCase().includes(normalized);
      const matchesStatus = status === "all" || project.status === status;
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (sort === "due") {
        const aDate = a.deadline ? new Date(a.deadline).getTime() : 0;
        const bDate = b.deadline ? new Date(b.deadline).getTime() : 0;
        return aDate - bDate;
      }
      if (sort === "priority") {
        const order = { High: 0, Medium: 1, Low: 2 };
        const aPriority = a.priority ? order[a.priority] : 3;
        const bPriority = b.priority ? order[b.priority] : 3;
        return aPriority - bPriority;
      }
      const aUpdated = new Date(a.updatedAt ?? a.createdAt).getTime();
      const bUpdated = new Date(b.updatedAt ?? b.createdAt).getTime();
      return bUpdated - aUpdated;
    });
  }, [projects, search, status, sort]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ProjectHeader
          search={search}
          status={status}
          sort={sort}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onSortChange={setSort}
        />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-36" />
            ))}
          </div>
        ) : (
          <ProjectGrid projects={filteredProjects} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectPage;
