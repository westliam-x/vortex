// components/projects/ProjectCard.tsx
"use client";

import { formatDate } from "@/lib/formatDate";
import { Project } from "@/types/project";
import Link from "next/link";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="bg-[#090909] p-4 border border-[#2F2F41] rounded-lg">
      <h2 className="text-lg font-semibold text-white">{project.title}</h2>
      <p className="text-sm text-gray-400 mb-2">{project.description}</p>
      <div className="flex justify-between text-sm text-gray-300">
        <span>Status: {project.status}</span>
        <span>Due: {formatDate(project.deadline)}</span>
      </div>
      <Link
        href={`/projects/${project.id}`}
        className="inline-block mt-3 text-white hover:underline text-sm"
      >
        View Details →
      </Link>
    </div>
  );
};

export default ProjectCard;
