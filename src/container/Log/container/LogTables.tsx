"use client";

import { useState } from "react";
import { LogEntry } from "@/types/logs";
import { format } from "date-fns";
import { Badge, Button, Card } from "@/components/ui";

interface Props {
  logs: LogEntry[];
  rowsPerPage?: number;
}

const LogsTable = ({ logs, rowsPerPage = 8 }: Props) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(logs.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedLogs = logs.slice(startIndex, startIndex + rowsPerPage);

  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[var(--surface-2)] text-[var(--text-subtle)] uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Actor</th>
              <th className="px-4 py-3 text-left">Target</th>
              <th className="px-4 py-3 text-left">Timestamp</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => (
                <tr
                  key={log._id}
                  className="border-t border-[var(--border)] hover:bg-[var(--surface-2)] transition"
                >
                  <td className="px-4 py-3 text-[var(--text)]">{log.action}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    <span className="font-medium text-[var(--text)]">{log.actor.name}</span>{" "}
                    <span className="text-xs text-[var(--text-subtle)]">
                      ({log.actor.role || "Member"})
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    {log.target.type}:{" "}
                    <span className="text-[var(--text)]">{log.target.name}</span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-subtle)]">
                    {format(new Date(log.timestamp), "dd MMM yyyy, hh:mm a")}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={log.status === "success" ? "success" : "error"}>
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-[var(--text-subtle)] italic"
                >
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between px-4 py-3 text-sm">
          <span className="text-[var(--text-subtle)]">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </Card>
  );
};

export default LogsTable;
