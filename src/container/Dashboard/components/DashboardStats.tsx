"use client";

import { StatsCard } from "@/components";
import { Briefcase, CheckCircle, Clock, DollarSign } from "lucide-react";

const stats = [
  {
    label: "Revenue",
    value: "$48,200",
    icon: DollarSign,
    tone: "info",
    description: "Last 90 days",
  },
  {
    label: "Active Projects",
    value: "5",
    icon: Clock,
    tone: "warning",
    description: "2 due this month",
  },
  {
    label: "Completed",
    value: "32",
    icon: CheckCircle,
    tone: "success",
    description: "All-time total",
  },
  {
    label: "Clients",
    value: "14",
    icon: Briefcase,
    tone: "default",
    description: "8 active",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          tone={stat.tone as "default" | "success" | "warning" | "info"}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
