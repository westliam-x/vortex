import { LogEntry } from "@/types/logs";
import { format } from "date-fns";

interface Props {
  logs: LogEntry[];
}

const LogsTable = ({ logs }: Props) => {
  return (
    <div className="overflow-x-auto border border-[#2F2F41] rounded-lg">
      <table className="min-w-full bg-[#090909] text-sm">
        <thead className="text-left text-gray-400">
          <tr>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Actor</th>
            <th className="px-4 py-2">Target</th>
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-t border-[#2F2F41]">
              <td className="px-4 py-2 text-white">{log.action}</td>
              <td className="px-4 py-2 text-white">
                {log.actor.name} ({log.actor.role})
              </td>
              <td className="px-4 py-2 text-white">
                {log.target.type}: {log.target.name}
              </td>
              <td className="px-4 py-2 text-gray-300">
                {format(new Date(log.timestamp), "dd MMM yyyy, hh:mm a")}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 text-xs rounded ${
                    log.status === "success"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-600 text-white"
                  }`}
                >
                  {log.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsTable;
