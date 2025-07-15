// containers/ProjectPage.tsx
"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { ProjectGrid, ProjectHeader } from "./components";
import { DashboardLayout } from "@/layouts";

const mockProjects: Project[] = [
  {
    id: "p1",
    title: "Website Redesign",
    status: "In Progress",
    clientId: "1",
    deadline: "2025-08-01",
    createdAt: "2025-07-01T10:00:00Z",
    team: ["user1", "user2"],
    description: "Redesign the client's corporate website with a fresh UI.",
  },
  {
    id: "p2",
    title: "Brand Identity",
    status: "Completed",
    clientId: "2",
    deadline: "2025-06-15",
    createdAt: "2025-05-20T09:30:00Z",
    team: ["user3"],
    description:
      "Develop a new brand identity including logo, fonts, and guidelines.",
  },
];

const ProjectPage = () => {
  const [projects] = useState<Project[]>(mockProjects);

  return (
    <DashboardLayout>
      <div className="p-6 text-white max-w-6xl">
        <ProjectHeader />
        <ProjectGrid projects={projects} />
      </div>
    </DashboardLayout>
  );
};
export default ProjectPage;
