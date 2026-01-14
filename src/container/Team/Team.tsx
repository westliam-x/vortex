"use client";

import { useState } from "react";
import { DashboardLayout } from "@/layouts";
import { TeamMember } from "@/types/team";
import { InviteUserModal } from "@/components";
import { TeamTable } from "./components";
import { Button, Card } from "@/components/ui";
import { mockTeam } from "@/data/mock";

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="md:text-3xl text-2xl font-semibold text-[var(--text)]">
              Team members
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              Manage access levels and assignments across your workspace.
            </p>
          </div>
          <Button onClick={() => setShowInviteModal(true)}>
            + Invite member
          </Button>
        </Card>

        <TeamTable
          members={team}
          onRoleChange={(id, newRole) =>
            setTeam((t) =>
              t.map((m) =>
                m.id === id ? { ...m, role: newRole as TeamMember["role"] } : m
              )
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
