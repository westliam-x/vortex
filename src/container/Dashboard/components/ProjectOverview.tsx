"use client";

import { fetchProjects } from "@/services/projectServices";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";

const ProjectOverview = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "in progress":
        return "bg-yellow-500/20 text-yellow-400";
      case "on hold":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1F] border border-[#2F2F41] rounded-2xl p-5 shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-5">Latest Projects</h2>

      {loading ? (
        <p className="text-sm text-gray-500 italic">Loading projects...</p>
      ) : projects.length > 0 ? (
        <div className="flex space-x-5 overflow-x-auto pb-3 hide-scrollbar">
          {projects.map((project) => (
            <div
              key={project.id}
              className="min-w-[260px] bg-[#141418] border border-[#2F2F41] rounded-xl p-4 text-white shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <h3 className="text-base font-medium mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 truncate">
                Client:{" "}
                {typeof project.clientId === "object" &&
                "name" in project.clientId
                  ? project.clientId.name
                  : "Personal"}
              </p>

              <span
                className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No recent projects.</p>
      )}
    </div>
  );
};

export default ProjectOverview;
