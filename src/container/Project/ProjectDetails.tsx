"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import { Client } from "@/types/client";
import { Button, EditProjectModal } from "@/components";
import { format } from "date-fns";
import Link from "next/link";
import { DashboardLayout } from "@/layouts";

const mockProjects: Record<string, Project> = {
  p1: {
    id: "p1",
    title: "Website Redesign",
    description: "Revamping the entire website for modern look",
    clientId: "1",
    status: "In Progress",
    type: "Paid",
    startDate: "2024-10-10",
    endDate: new Date("2024-12-20"),
    createdAt: "2024-10-01",
    updatedAt: "2024-10-20",
    priority: "High",
    techStack: ["Next.js", "Tailwind", "TypeScript"],
    feedback: "Looks great so far!",
    isPublic: true,
    assignedTo: ["dev123", "dev456"],
  },
};

const mockClients: Record<string, Client> = {
  "1": {
    _id: "1",
    name: "Chris Johnson",
    email: "chris@example.com",
    phone: "+1-202-555-0176",
    company: "Johnson Media",
    projects: [],
    status: "Active",
    joinedAt: "2024-12-01T14:35:00Z",
    notes: "",
    createdBy: "admin",
    assignedTo: ["dev123"],
  },
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleUpdateProject = (updatedData: Partial<Project>) => {
    setProject((prev) => (prev ? { ...prev, ...updatedData } : prev));
  };

  useEffect(() => {
    if (typeof id === "string") {
      const proj = mockProjects[id];
      setProject(proj || null);
      if (proj?.clientId && typeof proj.clientId === "string") {
        setClient(mockClients[proj.clientId] || null);
      }
    }
  }, [id]);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-6 text-white">Project not found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 max-w-6xl mx-auto text-white">
        <Link
          href="/projects"
          className="text-sm text-white hover:text-white"
        >
          ← Back to Projects
        </Link>

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {project.title}
            </h1>
            <p className="text-sm text-gray-400">
              {project.description || "No description provided."}
            </p>
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            <Button onClick={()=>setShowEditModal(true)} variant="primary">Edit</Button>
            <Button variant="destructive">Archive</Button>
            {project.status !== "Completed" && (
              <Button
                onClick={() => handleUpdateProject({ status: "Completed" })}
              >
                Completed
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-[#1E1E2E] p-4 rounded-lg border border-[#2F2F41]">
          <div>
            <p className="text-sm text-gray-400 mb-1">Client</p>
            <p>{client?.name || "Unknown client"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Status</p>
            <p>{project.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Priority</p>
            <p>{project.priority}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Deadline</p>
            <p>
              {project.endDate
                ? format(new Date(project.endDate), "dd MMM yyyy")
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Tech Stack</p>
            <p>{project.techStack?.join(", ") || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Visibility</p>
            <p>{project.isPublic ? "Public" : "Private"}</p>
          </div>
        </div>

        {project.feedback && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Client Feedback
            </h2>
            <p className="text-gray-300">{project.feedback}</p>
          </div>
        )}
      </div>
      <EditProjectModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        project={project}
        onSubmit={handleUpdateProject}
      />
    </DashboardLayout>
  );
};

export default ProjectDetails;
