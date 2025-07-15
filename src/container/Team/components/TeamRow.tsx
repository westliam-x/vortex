// components/team/TeamRow.tsx
"use client";

import { TeamMember } from "@/types/team";
import { format } from "date-fns";
import { Button } from "@/components";

interface Props {
  member: TeamMember;
  onRoleChange?: (id: string, newRole: string) => void;
  onRemove?: (id: string) => void;
}

const TeamRow = ({ member, onRoleChange, onRemove }: Props) => {
  const handleRoleChange = () => {
    const newRole = prompt("Enter new role (e.g. Developer):", member.role);
    if (newRole && onRoleChange) onRoleChange(member.id, newRole);
  };

  return (
    <tr className="border-b border-[#2F2F41]">
      <td className="py-3 px-4">{member.name}</td>
      <td className="py-3 px-4">{member.email}</td>
      <td className="py-3 px-4">{member.role}</td>
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1">
          {member.projects.map((project) => (
            <span
              key={project}
              className="bg-cyan-900/40 text-cyan-300 text-xs px-2 py-0.5 rounded-full"
            >
              {project}
            </span>
          ))}
        </div>
      </td>

      <td className="py-3 px-4">
        <span
          className={
            member.status === "Active" ? "text-green-400" : "text-yellow-400"
          }
        >
          {member.status}
        </span>
      </td>
      <td className="py-3 px-4">
        {format(new Date(member.joinedAt), "dd MMM yyyy")}
      </td>
      <td className="py-3 px-4 flex gap-2">
        <Button size="xs" variant="outline" onClick={handleRoleChange}>
          Change Role
        </Button>
        <Button
          size="xs"
          variant="destructive"
          onClick={() => onRemove?.(member.id)}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default TeamRow;
