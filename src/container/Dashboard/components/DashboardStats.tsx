"use client";

import { StatsCard } from "@/components";
import { Briefcase, CheckCircle, Clock, DollarSign } from "lucide-react";

type Stats = {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalClients: number;
  revenueByCurrency: Record<string, number>;
  revenueWindowDays: number;
};

const formatRevenue = (stats?: Stats) => {
  if (!stats) return "$0";
  const entries = Object.entries(stats.revenueByCurrency || {});
  if (entries.length === 0) return "$0";
  const [currency, amount] = entries[0];
  return `${currency} ${amount.toLocaleString()}`;
};

const DashboardStats = ({ stats, loading }: { stats?: Stats; loading: boolean }) => {
  const summary = stats ?? {
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalClients: 0,
    revenueByCurrency: {},
    revenueWindowDays: 90,
  };

  const cards = [
    {
      label: "Revenue",
      value: formatRevenue(stats),
      icon: DollarSign,
      tone: "info",
      description: `Last ${summary.revenueWindowDays} days`,
    },
    {
      label: "Active Projects",
      value: String(summary.activeProjects),
      icon: Clock,
      tone: "warning",
      description: `${summary.totalProjects} total`,
    },
    {
      label: "Completed",
      value: String(summary.completedProjects),
      icon: CheckCircle,
      tone: "success",
      description: "All-time total",
    },
    {
      label: "Clients",
      value: String(summary.totalClients),
      icon: Briefcase,
      tone: "default",
      description: "Active clients",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((stat) => (
        <StatsCard
          key={stat.label}
          label={loading ? `${stat.label}` : stat.label}
          value={loading ? "..." : stat.value}
          icon={stat.icon}
          tone={stat.tone as "default" | "success" | "warning" | "info"}
          description={stat.description}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
