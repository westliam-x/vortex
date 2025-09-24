"use client";

import { useState } from "react";
import { LogEntry } from "@/types/logs";
import { format } from "date-fns";
import { Button } from "@/components";

interface Props {
  logs: LogEntry[];
  rowsPerPage?: number;
}

const LogsTable = ({ logs, rowsPerPage = 8 }: Props) => {
  const [page, setPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(logs.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedLogs = logs.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="bg-[#111118] border border-[#2F2F41] rounded-xl p-4">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-[#1A1A28] text-gray-400 uppercase text-xs tracking-wider">
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
                  className="border-t border-[#2F2F41] hover:bg-[#1A1A28] transition"
                >
                  <td className="px-4 py-3 text-white">{log.action}</td>
                  <td className="px-4 py-3 text-gray-200">
                    <span className="font-medium">{log.actor.name}</span>{" "}
                    <span className="text-xs text-gray-400">
                      ({log.actor.role})
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-200">
                    {log.target.type}:{" "}
                    <span className="text-white">{log.target.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {format(new Date(log.timestamp), "dd MMM yyyy, hh:mm a")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${
                        log.status === "success"
                          ? "bg-green-600/80 text-white"
                          : "bg-red-600/80 text-white"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-400 italic"
                >
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-gray-400">
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
      )}
    </div>
  );
};

export default LogsTable;
