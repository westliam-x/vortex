// components/ClientList.tsx
"use client";

import { ClientCard } from "@/components";
import { Client } from "@/types/client";

// Extended mock client data
const mockClients: Client[] = [
  {
    id: "1",
    name: "Chris Johnson",
    email: "chris@example.com",
    phone: "+1-202-555-0176",
    company: "Johnson Media",
    avatarUrl: "/avatars/chris.jpg",
    projects: [
      { id: "p3", title: "E-commerce Platform", status: "Pending", createdAt: "2025-09-01", clientId: "1" },
    ],
    joinedAt: "2024-12-01T14:35:00Z",
    status: "Active",
    lastActivity: "2 hours ago",
    notes: "Interested in expanding project scope.",
    createdBy: "admin",
    assignedTo: ["user1", "user2"],
  },
  {
    id: "2",
    name: "Amaka Obi",
    email: "amaka@obi.io",
    phone: "+234-802-555-0133",
    company: "Obi Design Studio",
    avatarUrl: "/avatars/amaka.png",
     projects: [
      { id: "p3", title: "E-commerce Platform", status: "Pending", createdAt: "2025-09-01", clientId: "2" },
    ],
    joinedAt: "2025-02-15T09:00:00Z",
    status: "Inactive",
    lastActivity: "1 week ago",
    notes: "Awaiting feedback on initial design.",
    createdBy: "admin",
    assignedTo: ["user3"],
  },
];

const ClientList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockClients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  );
};

export default ClientList;
