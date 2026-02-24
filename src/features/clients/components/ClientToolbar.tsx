"use client";

import { Input } from "@/components";
import { Search } from "lucide-react";

const ClientToolbar = () => {
  return (
    <div className="relative w-full md:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] h-4 w-4" />
      <Input
        type="text"
        placeholder="Search clients..."
        className="pl-10"
      />
    </div>
  );
};

export default ClientToolbar;
