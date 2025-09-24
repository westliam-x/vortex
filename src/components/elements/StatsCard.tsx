import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color?: string;
  description?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color = "bg-white/10",
  description,
}: StatCardProps) {
  return (
    <div className="flex items-center justify-between gap-6 p-5 rounded-2xl border border-[#2F2F41] bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1F] shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Text Section */}
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <h3 className="text-2xl font-semibold text-white">{value}</h3>
        {description && (
          <span className="text-xs text-gray-500 mt-1">{description}</span>
        )}
      </div>

      {/* Icon Section */}
      <div
        className={`flex items-center justify-center h-12 w-12 rounded-full ${color} bg-opacity-20`}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  );
}
