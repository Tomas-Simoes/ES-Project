import { ListChecks, CircleCheck, Loader2, AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
}

function StatCard({ title, value, icon: Icon, iconColor }: StatCardProps) {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>

        <div className="p-2">
          <Icon
            className={iconColor}
            strokeWidth={2}
            size={28}
            style={{ opacity: 0.7 }}
          />
        </div>
      </div>
    </div>
  );
}

interface IncidentStatsProps {
  total: number;
  open: number;
  inProgress: number;
  highPriority: number;
}

export default function IncidentStats({
  total,
  open,
  inProgress,
  highPriority,
}: IncidentStatsProps) {
  const stats = [
    {
      title: "Total Incidents",
      value: total,
      icon: ListChecks,
      iconColor: "text-blue-500",
    },
    {
      title: "Open",
      value: open,
      icon: CircleCheck,
      iconColor: "text-emerald-500",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: Loader2,
      iconColor: "text-amber-500",
    },
    {
      title: "High Priority",
      value: highPriority,
      icon: AlertCircle,
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
