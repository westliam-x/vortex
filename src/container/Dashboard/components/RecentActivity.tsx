"use client";

import { useEffect, useState } from "react";
import { getLogs } from "@/services/clientServices";
import { LogEntry } from "@/types/logs";
import { Activity, User } from "lucide-react";

const RecentActivity = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getLogs();
        const sortedLogs = response.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setLogs(sortedLogs.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1F] border border-[#2F2F41] rounded-2xl p-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Activity size={20} className="text-[#985EFF]" />
        <h2 className="text-gray-200 text-lg font-semibold">Recent Activity</h2>
      </div>

      {/* Activity List */}
      <ul className="space-y-4">
        {loading ? (
          <li className="text-sm text-gray-500 italic">Loading...</li>
        ) : logs.length > 0 ? (
          logs.map((log) => (
            <li
              key={log._id ?? log.timestamp}
              className="border-b border-[#2F2F41]/60 pb-3 last:border-0"
            >
              {/* Action + Details */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white font-medium">
                    {log.action}
                  </p>
                  {log.details && (
                    <p className="text-xs text-gray-400">{log.details}</p>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Actor Info */}
              <div className="flex items-center gap-2 mt-2">
                <User size={14} className="text-gray-500" />
                <span className="text-xs text-gray-300">
                  {log.actor?.name && <span>{log.actor.name}</span>}{" "}
                  {log.actor?.role && (
                    <span className="ml-1 px-2 py-[2px] text-[10px] rounded-md bg-[#2F2F41] text-gray-400">
                      {log.actor.role}
                    </span>
                  )}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500 italic">No recent activity.</li>
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
