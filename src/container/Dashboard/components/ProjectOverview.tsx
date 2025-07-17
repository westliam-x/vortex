"use client";

import { fetchProjects } from "@/services/projectServices";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";

const ProjectOverview = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    load();
  }, []);
  return (
    <div className="bg-[#090909] border border-[#2F2F41] rounded-xl p-4 shadow-inner">
      <h2 className="text-white text-lg font-semibold mb-4">Latest Projects</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
        {projects.map((project) => (
          <div
            key={project.id}
            className="min-w-[250px] bg-[#090909] rounded-lg border-2 shadow-2xl border-[#25262A] p-4 text-white"
          >
            <h3 className="text-base">{project.title}</h3>
            <p className="text-sm text-gray-400 truncate">
              Client:{" "}
              {typeof project.clientId === "object" &&
              "name" in project.clientId
                ? project.clientId.name
                : "Personal"}
            </p>

            <span className="text-xs inline-block mt-2 px-2 py-1 bg-[#985EFF] text-white rounded-full">
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectOverview;
