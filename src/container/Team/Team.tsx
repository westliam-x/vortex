// containers/TeamPage.tsx
"use client";

import { useState } from "react";
import { DashboardLayout } from "@/layouts";
import { TeamMember } from "@/types/team";
import { InviteUserModal } from "@/components";
import { TeamTable } from "./components";

const mockTeam: TeamMember[] = [
  {
    id: "1",
    name: "Chris Johnson",
    email: "chris@devmail.com",
    role: "Admin",
    status: "Active",
    joinedAt: "2024-08-10T09:00:00Z",
    projects: ["Project A", "Project B"],
  },
  {
    id: "2",
    name: "Amaka Obi",
    email: "amaka@designhub.io",
    role: "Developer",
    status: "Pending",
    joinedAt: "2025-01-05T17:45:00Z",
    projects: ["Project C"],
  },
];

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-cyan-400">Team Members</h1>
          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-md"
          >
            + Invite Member
          </button>
        </div>

        <TeamTable
          members={team}
          onRoleChange={(id, newRole) =>
            setTeam((t) =>
              t.map((m) => (m.id === id ? { ...m, role: newRole as TeamMember["role"] } : m))
            )
          }
          onRemove={(id) => setTeam((t) => t.filter((m) => m.id !== id))}
        />

       <InviteUserModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={(data: { type: string }) => {
          if (data.type === "Client") {
            // send invite to client with data.projectId
          } else {
            // send invite to team member with data.role
          }
        }}
      />
      </div>
    </DashboardLayout>
  );
}
