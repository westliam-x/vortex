"use client";

import { Button, Input } from "@/components";
import { Search, UserPlus } from "lucide-react";

interface Props {
  onAddClient: () => void;
}

const ClientToolbar = ({ onAddClient }: Props) => {
  return (
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text)]">Clients</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Keep profiles, project history, and status in one place.
        </p>
      </div>

      {/* Actions */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] h-4 w-4" />
          <Input
            type="text"
            placeholder="Search clients..."
            className="pl-10"
          />
        </div>

        {/* Add Client Button */}
        <Button
          variant="primary"
          onClick={onAddClient}
          className="flex items-center justify-center gap-2"
        >
          <UserPlus size={16} />
          Add Client
        </Button>
      </div>
    </div>
  );
};

export default ClientToolbar;
