"use client";

import { useState } from "react";
import { Button } from "@/components";

type LogFilter = {
  target?: string;
  actor?: string;
  action?: string;
  status?: "success" | "failure";
  fromDate?: string;
  toDate?: string;
};

interface FiltersProps {
  onFilter: (filters: LogFilter) => void;
}

const LogsFilters = ({ onFilter }: FiltersProps) => {
  const [actor, setActor] = useState("");
  const [action, setAction] = useState("");
  const [status, setStatus] = useState<"" | "success" | "failure">("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: LogFilter = {};
    if (actor.trim()) filters.actor = actor.trim();
    if (action.trim()) filters.action = action.trim();
    if (status) filters.status = status;
    if (fromDate) filters.fromDate = fromDate;
    if (toDate) filters.toDate = toDate;
    onFilter(filters);
  };

  const handleReset = () => {
    setActor("");
    setAction("");
    setStatus("");
    setFromDate("");
    setToDate("");
    onFilter({});
  };

  return (
    <div className="p-4 mb-6 bg-[#111118] border border-[#2F2F41] rounded-xl shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
      >
        {/* Actor */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-400 mb-1">Actor</label>
          <input
            placeholder="Actor Name"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            className="bg-[#1A1A28] border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* Action */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-400 mb-1">Action</label>
          <input
            placeholder="Action performed"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="bg-[#1A1A28] border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-400 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "" | "success" | "failure")
            }
            className="bg-[#1A1A28] border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          >
            <option value="">All</option>
            <option value="success">✅ Success</option>
            <option value="failure">❌ Failure</option>
          </select>
        </div>

        {/* From Date */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-400 mb-1">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-[#1A1A28] border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-400 mb-1">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-[#1A1A28] border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button type="submit" className="w-full">
            Apply
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogsFilters;
