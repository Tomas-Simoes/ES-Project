import React from "react";
import { Users, Activity, CheckCircle2, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: string;
}

function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {trend}
            </p>
          )}
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

interface TeamOverviewStatsProps {
  totalIncidents: number;
  activeIncidents: number;
  resolvedToday: number;
  highPriorityOpen: number;
}

export default function TeamOverviewStats({
  totalIncidents,
  activeIncidents,
  resolvedToday,
  highPriorityOpen,
}: TeamOverviewStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Incidents"
        value={totalIncidents}
        icon={Users}
        color="text-blue-500"
        trend="All time"
      />
      <StatCard
        title="Active Now"
        value={activeIncidents}
        icon={Activity}
        color="text-amber-500"
        trend="Requires attention"
      />
      <StatCard
        title="Resolved Today"
        value={resolvedToday}
        icon={CheckCircle2}
        color="text-emerald-500"
        trend="+12% from yesterday"
      />
      <StatCard
        title="High Priority Open"
        value={highPriorityOpen}
        icon={AlertTriangle}
        color="text-red-500"
        trend="Needs immediate attention"
      />
    </div>
  );
}
