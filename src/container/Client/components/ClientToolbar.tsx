"use client";

import { Button } from "@/components";
import { Search, UserPlus } from "lucide-react";

interface Props {
  onAddClient: () => void;
}

const ClientToolbar = ({ onAddClient }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
      {/* Title */}
      <h1 className="text-2xl font-bold text-white">Clients</h1>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-10 pr-3 py-2 rounded-md bg-[#141421] text-white placeholder-gray-500 border border-gray-700 focus:border-[#985EFF] focus:ring-2 focus:ring-[#985EFF]/40 outline-none transition"
          />
        </div>

        {/* Add Client Button */}
        <Button
          variant="primary"
          onClick={onAddClient}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#985EFF] to-[#BA93FD] hover:opacity-90 transition text-white px-4 py-2 rounded-md text-sm shadow-md"
        >
          <UserPlus size={16} />
          Add Client
        </Button>
      </div>
    </div>
  );
};

export default ClientToolbar;
