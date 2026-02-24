"use client";

import { useState } from "react";
import { DashboardLayout } from "@/layouts";
import { InviteUserModal } from "@/components";
import { PageHeader } from "@/components/layout";
import { TeamTable } from "./components";
import { useTeam } from "./hooks/useTeam";
import { toast } from "react-toastify";

export default function TeamPage() {
  const { team, loading, changeRole, removeMember } = useTeam();
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Team Members"
          subtitle="Manage access levels and assignments across your workspace."
          primaryAction={{ label: "+ Invite member", onClick: () => setShowInviteModal(true) }}
        />

        <TeamTable
          members={team}
          onRoleChange={async (id, newRole) => {
            try {
              await changeRole(id, newRole as (typeof team)[number]["role"]);
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Failed to update role");
            }
          }}
          onRemove={async (id) => {
            try {
              await removeMember(id);
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Failed to remove member");
            }
          }}
          loading={loading}
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
