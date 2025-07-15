"use client";

import { Activity } from "lucide-react";

const recentLogs = [
  { id: 1, action: "Invited client 'The GOAT'", time: "2 hours ago" },
  { id: 2, action: "Marked 'eCommerce Site' as completed", time: "1 day ago" },
  { id: 3, action: "Responded to client feedback", time: "3 days ago" },
  { id: 4, action: "Updated project timeline for 'Portfolio'", time: "5 days ago" },
];

const RecentActivity = () => {
  return (
    <div className="bg-[#1E1E2E] border border-[#2F2F41] rounded-xl p-4 shadow-inner">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={18} className="text-blue-400" />
        <h2 className="text-gray-200 text-lg font-semibold">Recent Activity</h2>
      </div>
      <ul className="space-y-3">
        {recentLogs.map((log) => (
          <li key={log.id} className="text-sm text-gray-300">
            <span className="text-blue-300 font-medium">{log.action}</span>
            <span className="ml-2 text-gray-500 text-xs">({log.time})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
