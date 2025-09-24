// components/team/TeamTable.tsx
"use client";

import { TeamMember } from "@/types/team";
import TeamRow from "./TeamRow";

interface Props {
  members: TeamMember[];
  onRoleChange?: (id: string, newRole: string) => void;
  onRemove?: (id: string) => void;
}

const TeamTable = ({ members, onRoleChange, onRemove }: Props) => (
  <div className="overflow-x-auto border border-[#2F2F41] rounded-lg">
    <table className="min-w-full bg-[#090909] text-sm">
      <thead className="sticky top-0 bg-[#0f0f0f] z-10">
        <tr className="border-b border-[#2F2F41] text-left text-gray-300">
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Email</th>
          <th className="py-3 px-4">Role</th>
          <th className="py-3 px-4">Projects</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Joined</th>
          <th className="py-3 px-4">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-[#2F2F41]">
        {members.length > 0 ? (
          members.map((member) => (
            <TeamRow
              key={member.id}
              member={member}
              onRoleChange={onRoleChange}
              onRemove={onRemove}
            />
          ))
        ) : (
          <tr>
            <td
              colSpan={7}
              className="text-center py-6 text-gray-400 italic"
            >
              No team members yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default TeamTable;
