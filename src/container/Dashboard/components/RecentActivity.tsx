"use client";

import { useEffect, useState } from "react";
import { getLogs } from "@/services/clientServices";
import { LogEntry } from "@/types/logs";
import { Activity } from "lucide-react";

const RecentActivity = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getLogs();
        // Sort logs by timestamp descending (newest first)
        const sortedLogs = response.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setLogs(sortedLogs.slice(0, 3)); // Keep only the 3 most recent
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-[#090909] border border-[#2F2F41] rounded-xl p-4 shadow-inner">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={18} className="text-[#985EFF]" />
        <h2 className="text-gray-200 text-lg font-semibold">Recent Activity</h2>
      </div>
      <ul className="space-y-3">
        {logs.length > 0 ? (
          logs.map((log) => (
            <li key={log._id ?? log.timestamp} className="text-sm text-gray-300">
              <div>
                <span className="font-medium text-white">{log.action}</span>
                <span className="ml-2 text-gray-400">
                  {log.details && ` - ${log.details}`}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                <span>
                  By <span className="font-medium">{log.actor?.role}</span>
                  {log.actor?.name ? ` (${log.actor.name})` : ""}
                </span>
                <span className="ml-2">
                  on {new Date(log.timestamp).toLocaleString()}
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
