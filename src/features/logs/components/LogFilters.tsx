"use client";

import { useState } from "react";
import { Button, Card, Input, Select } from "@/components/ui";

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
    <Card>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
      >
        <div className="flex flex-col">
          <label className="text-xs text-[var(--text-subtle)] mb-1">Actor</label>
          <Input
            placeholder="Actor name"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-[var(--text-subtle)] mb-1">Action</label>
          <Input
            placeholder="Action performed"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-[var(--text-subtle)] mb-1">Status</label>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as "" | "success" | "failure")}
          >
            <option value="">All</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
          </Select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-[var(--text-subtle)] mb-1">From</label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-[var(--text-subtle)] mb-1">To</label>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

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
    </Card>
  );
};

export default LogsFilters;
