import React from "react";
import { AlertCircle, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className="p-2">
          <Icon
            className={color}
            strokeWidth={2}
            size={24}
            style={{ opacity: 0.7 }}
          />
        </div>
      </div>
    </div>
  );
}

interface MyIncidentStatsProps {
  open: number;
  inProgress: number;
  resolved: number;
}

export default function MyIncidentStats({
  open,
  inProgress,
  resolved,
}: MyIncidentStatsProps) {
  const totalActive = open + inProgress;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Active Incidents"
        value={totalActive}
        icon={AlertCircle}
        color="text-blue-500"
      />
      <StatCard
        title="In Progress"
        value={inProgress}
        icon={TrendingUp}
        color="text-amber-500"
      />
      <StatCard
        title="Resolved"
        value={resolved}
        icon={CheckCircle2}
        color="text-emerald-500"
      />
      <StatCard
        title="Hours Logged"
        value="12.5"
        icon={Clock}
        color="text-purple-500"
      />
    </div>
  );
}
