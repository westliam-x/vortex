"use client";

import { DashboardLayout } from "@/layouts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Client } from "@/types/client";
import Link from "next/link";
import { format } from "date-fns";
import { Button, EditClientModal } from "@/components";

const mockClientData: Record<string, Client> = {
  "1": {
    id: "1",
    name: "Chris Johnson",
    email: "chris@example.com",
    phone: "+1-202-555-0176",
    company: "Johnson Media",
    projects: [
      { id: "p1", title: "Website Redesign", status: "In Progress" },
      { id: "p2", title: "Brand Identity", status: "Completed" },
    ],
    status: "Active",
    joinedAt: "2024-12-01T14:35:00Z",
    notes: "Interested in expanding project scope.",
    createdBy: "admin",
    assignedTo: ["user1", "user2"],
  },
  "2": {
    id: "2",
    name: "Amaka Obi",
    email: "amaka@obi.io",
    phone: "+234-802-555-0133",
    company: "Obi Design Studio",
    projects: [{ id: "p3", title: "E-commerce Platform", status: "Pending" }],
    status: "Inactive",
    joinedAt: "2025-02-15T09:00:00Z",
    notes: "Awaiting feedback on initial design.",
    createdBy: "admin",
    assignedTo: ["user3"],
  },
};

export default function ClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    if (typeof id === "string") {
      setClient(mockClientData[id] ?? null);
    }
  }, [id]);

  const handleUpdateClient = (updatedClient: Client) => {
    setClient(updatedClient);
  };

  if (!client) {
    return (
      <DashboardLayout>
        <div className="p-6 text-white">
          <Link href="/clients">
            <button className="mb-6 text-sm text-cyan-400 hover:text-cyan-300">
              ← Back to Clients
            </button>
          </Link>

          <h1 className="text-2xl font-semibold">Client not found</h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-2 max-w-6xl mx-auto text-white">
        <Link href="/clients">
          <button className="mb-6 text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to Clients
          </button>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">{client.name}</h1>
            <p className="text-sm text-gray-400">
              {client.company ? client.company : "No company specified"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowEditModal(true)} variant="primary">
              Edit Client
            </Button>
            <Button variant="secondary">Message Client</Button>
            <Button variant="destructive">Remove Client</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-[#1E1E2E] p-4 rounded-lg border border-[#2F2F41]">
          <div>
            <p className="text-sm text-gray-400 mb-1">Email</p>
            <p>{client.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Phone</p>
            <p>{client.phone || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Status</p>
            <p>{client.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Joined</p>
            <p>{format(new Date(client.joinedAt), "dd MMM yyyy")}</p>
          </div>
        </div>

        {client.notes && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">Notes</h2>
            <p className="text-gray-300">{client.notes}</p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">Projects</h2>
          {client.projects.length > 0 ? (
            <div className="overflow-x-auto border border-[#2F2F41] rounded-lg">
              <table className="min-w-full bg-[#1E1E2E] text-sm">
                <thead>
                  <tr className="border-b border-[#2F2F41]">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {client.projects.map((project) => (
                    <tr key={project.id} className="border-b border-[#2F2F41]">
                      <td className="py-3 px-4">{project.title}</td>
                      <td className="py-3 px-4">{project.status}</td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/projects/${project.id}`}
                          className="text-cyan-400 hover:underline"
                        >
                          View Project
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No projects linked to this client.</p>
          )}
        </div>
      </div>
      <EditClientModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        client={client}
        onUpdate={handleUpdateClient}
      />
    </DashboardLayout>
  );
}
