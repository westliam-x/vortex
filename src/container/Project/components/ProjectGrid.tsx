// components/projects/ProjectGrid.tsx
"use client";

import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];
}

const ProjectGrid = ({ projects }: Props) => {
  if (!projects.length) {
    return <p className="text-gray-400">No projects created yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectGrid;
