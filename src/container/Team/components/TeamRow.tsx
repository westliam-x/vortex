"use client";

import { TeamMember } from "@/types/team";
import { format } from "date-fns";
import { Badge, Button, Select } from "@/components/ui";

interface Props {
  member: TeamMember;
  onRoleChange?: (id: string, newRole: string) => void;
  onRemove?: (id: string) => void;
}

const TeamRow = ({ member, onRoleChange, onRemove }: Props) => {
  const statusTone = member.status === "Active" ? "success" : "warning";

  return (
    <tr className="border-b border-[var(--border)] hover:bg-[var(--surface-2)] transition">
      <td className="py-3 px-4 font-medium text-[var(--text)]">{member.name}</td>
      <td className="py-3 px-4 text-[var(--text-muted)]">{member.email}</td>
      <td className="py-3 px-4">
        <Select
          value={member.role}
          onChange={(e) => onRoleChange?.(member.id, e.target.value)}
          className="max-w-[140px]"
        >
          <option value="Admin">Admin</option>
          <option value="Developer">Developer</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Client">Client</option>
        </Select>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1 text-xs text-[var(--text-subtle)]">
          {member.projects.map((project) => (
            <span key={project} className="rounded-full bg-[var(--surface-2)] px-2 py-0.5">
              {project}
            </span>
          ))}
        </div>
      </td>
      <td className="py-3 px-4">
        <Badge tone={statusTone as "success" | "warning"}>{member.status}</Badge>
      </td>
      <td className="py-3 px-4 text-[var(--text-subtle)]">
        {format(new Date(member.joinedAt), "dd MMM yyyy")}
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <Button size="xs" variant="outline" onClick={() => onRoleChange?.(member.id, member.role)}>
            Save role
          </Button>
          <Button size="xs" variant="destructive" onClick={() => onRemove?.(member.id)}>
            Remove
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default TeamRow;
