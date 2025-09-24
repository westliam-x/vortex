"use client";

import { Client } from "@/types/client";
import { useRouter } from "next/navigation";
import { Folder, Mail } from "lucide-react";

const ClientCard = ({ client }: { client: Client }) => {
  const router = useRouter();

  return (
    <div className="group bg-[#0C0C14] border border-[#2F2F41] rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-cyan-500 transition-all duration-200">
      {/* Name & Email */}
      <h2 className="text-lg font-semibold text-white truncate group-hover:text-cyan-400">
        {client.name}
      </h2>
      <p className="flex items-center gap-1 text-sm text-gray-400 truncate">
        <Mail size={14} className="text-gray-500" />
        {client.email}
      </p>

      {/* Projects & Status */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <span className="flex items-center gap-1 text-gray-300">
          <Folder size={14} className="text-gray-500" />
          {(client?.projects || []).length} Projects
        </span>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            client.status === "Active"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {client.status}
        </span>
      </div>

      {/* Action Button */}
      <button
        className="mt-5 w-full cursor-pointer bg-gradient-to-r from-[#985EFF] to-[#6D28D9] hover:opacity-90 text-white text-sm py-2 rounded-lg font-medium transition"
        onClick={() => router.push(`/clients/${client._id}`)}
      >
        View Details
      </button>
    </div>
  );
};

export default ClientCard;
