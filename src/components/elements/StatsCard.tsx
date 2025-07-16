import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-[#090909] border border-[#2F2F41] rounded-xl shadow-inner">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <h3 className="text-xl font-semibold text-white">{value}</h3>
      </div>
      <Icon className={`h-6 w-6 ${color || "text-white/60"}`} />
    </div>
  );
}
