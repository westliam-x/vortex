"use client";

import { StatsCard } from "@/components";
import { Briefcase, CheckCircle, Clock, DollarSign } from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "₦1,250,000",
    icon: DollarSign,
    color: "text-[#985EFF]",
  },
  {
    label: "Ongoing Projects",
    value: "5",
    icon: Clock,
    color: "text-[#985EFF]",
  },
  {
    label: "Completed Projects",
    value: "32",
    icon: CheckCircle,
    color: "text-[#985EFF]",
  },
  {
    label: "Clients",
    value: "14",
    icon: Briefcase,
    color: "text-[#985EFF]",
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
          color={stat.color}
        />
      ))}
    </div>
  );
}

export default DashboardStats;