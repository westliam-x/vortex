"use client";

import { formatDate } from "@/lib/formatDate";
import { Project } from "@/types/project";
import Link from "next/link";
import { Badge, Card } from "@/components/ui";
import { CalendarDays, ChevronRight } from "lucide-react";

interface Props {
  project: Project;
}

const statusTone: Record<Project["status"], "default" | "success" | "warning" | "info"> = {
  Pending: "info",
  "In Progress": "warning",
  Completed: "success",
  Archived: "default",
};

const ProjectCard = ({ project }: Props) => {
  const clientName =
    typeof project.clientId === "object" && project.clientId && "name" in project.clientId
      ? project.clientId.name
      : "Client";

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text)]">
            {project.title}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {project.description || "No description yet."}
          </p>
        </div>
        <Badge tone={statusTone[project.status]}>{project.status}</Badge>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-subtle)]">
        <span>{clientName}</span>
        <span className="inline-flex items-center gap-1">
          <CalendarDays size={14} />
          {project.deadline ? formatDate(project.deadline) : "No due date"}
        </span>
      </div>

      <Link
        href={`/projects/${project.id}`}
        className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:text-[var(--accent-strong)]"
      >
        Enter Vortex <ChevronRight size={16} />
      </Link>
    </Card>
  );
};

export default ProjectCard;
