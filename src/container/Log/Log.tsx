"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/layouts";
import LogsFilters from "./container/LogFilters";
import LogsTable from "./container/LogTables";
import { getLogs } from "@/services/clientServices";
import { LogEntry } from "@/types/logs";
import { Button, Card, EmptyState, ErrorState, Skeleton } from "@/components/ui";

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
  const [error, setError] = useState(false);

  const loadLogs = async () => {
    setLoading(true);
    setError(false);
    try {
      const logs = await getLogs();
      setAllLogs(logs);
      setFilteredLogs(logs);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
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
      <div className="space-y-6">
        <Card className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-[var(--text)]">Activity logs</h2>
            <p className="text-sm text-[var(--text-muted)]">
              Every action inside a Vortex space, in one timeline.
            </p>
          </div>
          <Button variant="secondary">Export (coming soon)</Button>
        </Card>

        <LogsFilters onFilter={handleFilter} />

        {loading ? (
          <Card>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full" />
              ))}
            </div>
          </Card>
        ) : error ? (
          <ErrorState
            title="Unable to load logs"
            description="Try refreshing the page or check your connection."
            action={<Button onClick={loadLogs}>Retry</Button>}
          />
        ) : filteredLogs.length === 0 ? (
          <EmptyState
            title="No activity found"
            description="Try adjusting filters or check back after new activity."
          />
        ) : (
          <LogsTable logs={filteredLogs} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default LogsPage;
