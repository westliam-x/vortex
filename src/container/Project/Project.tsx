"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import { ProjectGrid, ProjectHeader } from "./components";
import { DashboardLayout } from "@/layouts";
import { makeRequest } from "@/api/request";
import { toast } from "react-toastify";
import API_ROUTES from "@/endpoints/routes";

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await makeRequest<{ projects: Project[] }>({
          url: API_ROUTES.PROJECT.LIST,
          method: "GET",
        });

        setProjects(response.projects);
      } catch (error) {
        toast.error("Failed to fetch projects.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 text-white max-w-6xl">
        <ProjectHeader />
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectPage;
