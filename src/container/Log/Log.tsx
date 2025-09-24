"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/layouts";
import LogsFilters from "./container/LogFilters";
import LogsTable from "./container/LogTables";
import { getLogs } from "@/services/clientServices";
import { LogEntry } from "@/types/logs";

type LogFilter = {
  target?: string;
  actor?: string;
  action?: string;
  status?: "success" | "failure" | "";
  fromDate?: string;
  toDate?: string;
};

const LogsPage = () => {
  const [allLogs, setAllLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logs = await getLogs();
        setAllLogs(logs);
        setFilteredLogs(logs);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleFilter = (filters: LogFilter) => {
    const filtered = allLogs.filter((log) => {
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
      <div className="md:p-6 p-3">
        <h2 className="text-xl font-semibold text-white mb-4">Activity Logs</h2>
        <LogsFilters onFilter={handleFilter} />
        {loading ? (
          <p className="text-gray-400 mt-4">Loading logs...</p>
        ) : (
          <LogsTable logs={filteredLogs} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default LogsPage;
