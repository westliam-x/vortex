// components/projects/ProjectGrid.tsx
"use client";

import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import { EmptyState } from "@/components/ui";

interface Props {
  projects: Project[];
}

const ProjectGrid = ({ projects }: Props) => {
  if (!projects.length) {
    return (
      <EmptyState
        title="No projects yet"
        description="Create a project to start your first Vortex space."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project?.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectGrid;
