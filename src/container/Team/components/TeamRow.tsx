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
    <tr className="border-b border-[#2F2F41] hover:bg-[#11111a]/60 transition">
      {/* Name */}
      <td className="py-3 px-4 font-medium text-white">{member.name}</td>

      {/* Email */}
      <td className="py-3 px-4 text-gray-300">{member.email}</td>

      {/* Role */}
      <td className="py-3 px-4">
        <span className="bg-[#2b2b3d] text-cyan-300 text-xs px-2 py-1 rounded-md">
          {member.role}
        </span>
      </td>

      {/* Projects */}
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1">
          {member.projects.map((project) => (
            <span
              key={project}
              className=" text-white text-xs py-0.5"
            >
              {project}
            </span>
          ))}
        </div>
      </td>

      {/* Status */}
      <td className="py-3 px-4">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            member.status === "Active"
              ? "bg-green-900/40 text-green-300"
              : "bg-yellow-900/40 text-yellow-300"
          }`}
        >
          {member.status}
        </span>
      </td>

      {/* Joined Date */}
      <td className="py-3 px-4 text-gray-400">
        {format(new Date(member.joinedAt), "dd MMM yyyy")}
      </td>

      {/* Actions */}
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <Button
            size="xs"
            variant="outline"
            className="border-gray-600 text-gray-200 hover:bg-[#222]"
            onClick={handleRoleChange}
          >
            Change Role
          </Button>
          <Button
            size="xs"
            variant="destructive"
            className="bg-red-600/80 hover:bg-red-600 text-white"
            onClick={() => onRemove?.(member.id)}
          >
            Remove
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default TeamRow;
