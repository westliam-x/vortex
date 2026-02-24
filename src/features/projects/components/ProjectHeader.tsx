"use client";

import { Input, Select } from "@/components";
import { Search } from "lucide-react";

interface ProjectHeaderProps {
  search: string;
  status: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const ProjectHeader = ({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: ProjectHeaderProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects, clients, or tags"
          className="pl-9"
        />
      </div>
      <Select value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="all">All statuses</option>
        <option value="In Progress">In Progress</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Archived">Archived</option>
      </Select>
      <Select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="recent">Sort: Recent</option>
        <option value="due">Sort: Due date</option>
        <option value="priority">Sort: Priority</option>
      </Select>
    </div>
  );
};

export default ProjectHeader;
