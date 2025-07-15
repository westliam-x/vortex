"use client";

import { useState } from "react";
type LogFilter = {
  target?: string;
  actor?: string;
  action?: string;
  status?: "success" | "failure" | ""; 
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
    onFilter({ actor, action, status, fromDate, toDate });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <input
        placeholder="Actor Name"
        value={actor}
        onChange={(e) => setActor(e.target.value)}
        className="bg-[#1A1A28] border border-gray-600 text-white px-3 py-2 rounded"
      />
      <input
        placeholder="Action"
        value={action}
        onChange={(e) => setAction(e.target.value)}
        className="bg-[#1A1A28] border border-gray-600 text-white px-3 py-2 rounded"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "" | "success" | "failure")}
        className="bg-[#1A1A28] border border-gray-600 text-white px-3 py-2 rounded"
      >
        <option value="">All Statuses</option>
        <option value="success">Success</option>
        <option value="failure">Failure</option>
      </select>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="bg-[#1A1A28] border border-gray-600 text-white px-3 py-2 rounded"
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="bg-[#1A1A28] border border-gray-600 text-white px-3 py-2 rounded"
      />
    </form>
  );
};

export default LogsFilters;
