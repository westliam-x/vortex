"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import { ProjectGrid, ProjectHeader } from "./components";
import { DashboardLayout } from "@/layouts";
import { toast } from "react-toastify";
import { fetchProjects } from "@/services/projectServices";

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        toast.error("Failed to fetch projects.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
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
