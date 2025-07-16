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
    <div className="bg-[#090909] border border-[#2F2F41] rounded-xl p-4 shadow-inner">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={18} className="text-[#985EFF]" />
        <h2 className="text-gray-200 text-lg font-semibold">Recent Activity</h2>
      </div>
      <ul className="space-y-3">
        {recentLogs.map((log) => (
          <li key={log.id} className="text-sm ">
            <span className="font-medium">{log.action}</span>
            <span className="ml-2 text-gray-500 text-xs">({log.time})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
