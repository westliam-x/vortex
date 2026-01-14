"use client";

import { TeamMember } from "@/types/team";
import TeamRow from "./TeamRow";
import { Card, EmptyState } from "@/components/ui";

interface Props {
  members: TeamMember[];
  onRoleChange?: (id: string, newRole: string) => void;
  onRemove?: (id: string) => void;
}

const TeamTable = ({ members, onRoleChange, onRemove }: Props) => (
  <Card className="p-0 overflow-hidden">
    {members.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[var(--surface)] text-sm">
          <thead className="bg-[var(--surface-2)]">
            <tr className="border-b border-[var(--border)] text-left text-[var(--text-subtle)]">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Projects</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Joined</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {members.map((member) => (
              <TeamRow
                key={member.id}
                member={member}
                onRoleChange={onRoleChange}
                onRemove={onRemove}
              />
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <EmptyState
        title="No team members yet"
        description="Invite your first collaborator to get started."
      />
    )}
  </Card>
);

export default TeamTable;
