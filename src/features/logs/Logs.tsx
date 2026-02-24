"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { PageHeader } from "@/components/layout";
import { Button, Input, Select, StatusBadge } from "@/components/ui";
import { DataTable, FilterBar, NoResults } from "@/components/patterns";
import { getLogs } from "./services/logs.service";
import type { LogEntry } from "@/types/logs";

export default function Logs() {
  const [allLogs, setAllLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");

  const loadLogs = async () => {
    setLoading(true);
    try {
      const logs = await getLogs();
      setAllLogs(logs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    const term = search.toLowerCase().trim();
    const items = allLogs.filter((log) => {
      const actor = log.actor.name.toLowerCase();
      const action = log.action.toLowerCase();
      const target = log.target.name.toLowerCase();
      const matchesSearch = !term || actor.includes(term) || action.includes(term) || target.includes(term);
      const matchesStatus = status === "all" || (log.status ?? "success") === status;
      return matchesSearch && matchesStatus;
    });

    return items.sort((a, b) => {
      if (sort === "actor") return a.actor.name.localeCompare(b.actor.name);
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [allLogs, search, status, sort]);

  const hasFilters = search.trim().length > 0 || status !== "all" || sort !== "recent";
  const showNoResults = !loading && allLogs.length > 0 && filteredLogs.length === 0 && hasFilters;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Logs"
        subtitle="Every action inside a Vortex space, in one timeline."
        primaryAction={{ label: "Refresh", variant: "secondary", onClick: () => void loadLogs() }}
      />

      <FilterBar
        searchSlot={
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search actor, action, or target"
          />
        }
        filterChipsSlot={
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
          </Select>
        }
        sortSlot={
          <Select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="recent">Sort: Recent</option>
            <option value="actor">Sort: Actor</option>
          </Select>
        }
        rightActionsSlot={
          hasFilters ? (
            <Button variant="ghost" onClick={() => {
              setSearch("");
              setStatus("all");
              setSort("recent");
            }}>
              Reset
            </Button>
          ) : null
        }
      />

      {showNoResults ? (
        <NoResults
          title="No logs match your filters"
          description="Try a broader query or clear current filters."
          onReset={() => {
            setSearch("");
            setStatus("all");
            setSort("recent");
          }}
        />
      ) : (
        <DataTable
          columns={[
            { key: "actor", header: "Actor", cell: (row) => row.actor.name },
            { key: "action", header: "Action", cell: (row) => row.action },
            { key: "target", header: "Target", cell: (row) => row.target.name },
            { key: "status", header: "Status", cell: (row) => <StatusBadge kind="log" status={row.status ?? "success"} /> },
            {
              key: "time",
              header: "Time",
              cell: (row) => format(new Date(row.timestamp), "dd MMM yyyy, HH:mm"),
            },
          ]}
          rows={filteredLogs}
          loading={loading}
          loadingRows={8}
          getRowKey={(row) => row._id}
          emptyState={{
            title: "No activity yet",
            description: "Logs will appear here as your workspace activity grows.",
            primaryAction: { label: "Refresh", variant: "secondary", onClick: () => void loadLogs() },
          }}
        />
      )}
    </div>
  );
}
