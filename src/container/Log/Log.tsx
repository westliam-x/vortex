"use client";

import { useState } from "react";
import { DashboardLayout } from "@/layouts";
import LogsFilters from "./container/LogFilters";
import LogsTable from "./container/LogTables";
import { LogEntry } from "@/types/logs";

type LogFilter = {
  target?: string;
  actor?: string;
  action?: string;
  status?: "success" | "failure" | "";
  fromDate?: string;
  toDate?: string;
};

const sample_logs: LogEntry[] = [
  {
    id: "log1",
    action: "Created Project",
    actor: { id: "u1", name: "William", role: "Admin" },
    target: { type: "Project", name: "Ayinke Website" },
    status: "success",
    timestamp: "2025-07-14T09:15:00Z",
  },
  {
    id: "log2",
    action: "Invited Client",
    actor: { id: "u1", name: "William", role: "Admin" },
    target: { type: "Client", name: "Ayinke Ayomide" },
    status: "success",
    timestamp: "2025-07-14T10:30:00Z",
  },
  {
    id: "log3",
    action: "Updated Role",
    actor: { id: "u2", name: "Emeli", role: "Project Manager" },
    target: { type: "TeamMember", name: "Nonso Emmanuel" },
    status: "success",
    timestamp: "2025-07-14T12:20:00Z",
  },
  {
    id: "log4",
    action: "Deleted Project",
    actor: { id: "u3", name: "Admin User", role: "Admin" },
    target: { type: "Project", name: "Legacy App Cleanup" },
    status: "failure",
    timestamp: "2025-07-13T17:45:00Z",
  },
  {
    id: "log5",
    action: "Submitted Review",
    actor: { id: "u4", name: "Ayinke Ayomide", role: "Client" },
    target: { type: "Project", name: "Ayinke Website" },
    status: "success",
    timestamp: "2025-07-13T15:10:00Z",
  },
  {
    id: "log6",
    action: "Completed Project",
    actor: { id: "u5", name: "Shola Ade", role: "Developer" },
    target: { type: "Project", name: "Spark Website" },
    status: "success",
    timestamp: "2025-07-12T18:00:00Z",
  },
  {
    id: "log7",
    action: "Updated Deadline",
    actor: { id: "u2", name: "Emeli", role: "Project Manager" },
    target: { type: "Project", name: "Skyboard Dashboard" },
    status: "success",
    timestamp: "2025-07-11T11:45:00Z",
  },
  {
    id: "log8",
    action: "Invited Team Member",
    actor: { id: "u1", name: "William", role: "Admin" },
    target: { type: "TeamMember", name: "Tobi Lawal" },
    status: "success",
    timestamp: "2025-07-10T14:00:00Z",
  },
  {
    id: "log9",
    action: "Failed Review Submission",
    actor: { id: "u4", name: "Ayinke Ayomide", role: "Client" },
    target: { type: "Project", name: "Spark Website" },
    status: "failure",
    timestamp: "2025-07-10T15:25:00Z",
  },
  {
    id: "log10",
    action: "Marked Task Complete",
    actor: { id: "u6", name: "Nonso Emmanuel", role: "Developer" },
    target: { type: "System", name: "Navbar Integration" },
    status: "success",
    timestamp: "2025-07-09T16:10:00Z",
  },
];

const LogsPage = () => {
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>(sample_logs);

  const handleFilter = (filters: LogFilter) => {
    const filtered = sample_logs.filter((log) => {
      return (
        (!filters.target ||
          log.target.name.toLowerCase().includes(filters.target.toLowerCase())) &&
        (!filters.actor ||
          log.actor.name.toLowerCase().includes(filters.actor.toLowerCase())) &&
        (!filters.action ||
          log.action.toLowerCase().includes(filters.action.toLowerCase())) &&
        (!filters.status || log.status === filters.status) &&
        (!filters.fromDate ||
          new Date(log.timestamp) >= new Date(filters.fromDate)) &&
        (!filters.toDate ||
          new Date(log.timestamp) <= new Date(filters.toDate))
      );
    });

    setFilteredLogs(filtered);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Activity Logs</h2>
        <LogsFilters onFilter={handleFilter} />
        <LogsTable logs={filteredLogs} />
      </div>
    </DashboardLayout>
  );
};

export default LogsPage;
