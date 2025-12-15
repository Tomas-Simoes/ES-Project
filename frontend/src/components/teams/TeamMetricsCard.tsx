// src/components/teams/TeamMetricsCard.tsx
import { Users, CheckCircle, Clock, TrendingUp, Activity } from "lucide-react";

interface TeamMetrics {
  id: string;
  name: string;
  category: string;
  totalTechs: number;
  availableTechs: number;
  busyTechs: number;
  openIncidents: number;
  inProgressIncidents: number;
  resolvedToday: number;
  avgResolutionTime: string;
  workloadPercentage: number;
  responseTime: string;
}

interface Props {
  team: TeamMetrics;
  onAssign?: (teamId: string) => void;
}

export default function TeamMetricsCard({ team, onAssign }: Props) {
  const getWorkloadColor = (percentage: number) => {
    if (percentage >= 80) return "bg-red-500";
    if (percentage >= 60) return "bg-orange-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getWorkloadTextColor = (percentage: number) => {
    if (percentage >= 80) return "text-red-600 dark:text-red-400";
    if (percentage >= 60) return "text-orange-600 dark:text-orange-400";
    if (percentage >= 40) return "text-yellow-600 dark:text-yellow-400";
    return "text-green-600 dark:text-green-400";
  };

  const getAvailabilityStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage >= 50)
      return { text: "Good", color: "text-green-600 dark:text-green-400" };
    if (percentage >= 25)
      return { text: "Limited", color: "text-orange-600 dark:text-orange-400" };
    return { text: "Low", color: "text-red-600 dark:text-red-400" };
  };

  const availability = getAvailabilityStatus(
    team.availableTechs,
    team.totalTechs
  );

  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow p-4">
      {/* Team Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {team.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {team.category}
          </p>
        </div>
        <span className={`text-xs font-semibold ${availability.color}`}>
          {availability.text}
        </span>
      </div>

      {/* Technicians Status */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <Users className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Total
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {team.totalTechs}
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
            <span className="text-xs text-green-600 dark:text-green-400">
              Free
            </span>
          </div>
          <p className="text-xl font-bold text-green-700 dark:text-green-300">
            {team.availableTechs}
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <Activity className="w-3 h-3 text-orange-600 dark:text-orange-400" />
            <span className="text-xs text-orange-600 dark:text-orange-400">
              Busy
            </span>
          </div>
          <p className="text-xl font-bold text-orange-700 dark:text-orange-300">
            {team.busyTechs}
          </p>
        </div>
      </div>

      {/* Incidents Overview */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Open</span>
          <span className="font-bold text-red-600 dark:text-red-400">
            {team.openIncidents}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">In Progress</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {team.inProgressIncidents}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Resolved Today
          </span>
          <span className="font-bold text-green-600 dark:text-green-400">
            {team.resolvedToday}
          </span>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <Clock className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Avg Time
            </span>
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {team.avgResolutionTime}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <TrendingUp className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Response
            </span>
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {team.responseTime}
          </p>
        </div>
      </div>

      {/* Workload Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Workload
          </span>
          <span
            className={`text-xs font-bold ${getWorkloadTextColor(
              team.workloadPercentage
            )}`}
          >
            {team.workloadPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${getWorkloadColor(
              team.workloadPercentage
            )} transition-all duration-500 rounded-full`}
            style={{ width: `${team.workloadPercentage}%` }}
          />
        </div>
      </div>

      {/* Assignment Button */}
      {onAssign && (
        <button
          onClick={() => onAssign(team.id)}
          className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          Assign to Team
        </button>
      )}
    </div>
  );
}
