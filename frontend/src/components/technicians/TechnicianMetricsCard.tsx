// src/components/technicians/TechnicianMetricsCard.tsx
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
} from "lucide-react";

interface TechnicianMetrics {
  id: string;
  name: string;
  email: string;
  status: "available" | "busy" | "offline";
  totalIncidents: number;
  openIncidents: number;
  inProgressIncidents: number;
  resolvedToday: number;
  avgResolutionTime: string;
  workloadPercentage: number;
  lastActivity: string;
  highPriorityCount: number;
}

interface Props {
  technician: TechnicianMetrics;
  onViewDetails?: (techId: string) => void;
}

export default function TechnicianMetricsCard({
  technician,
  onViewDetails,
}: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-orange-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-green-600 dark:text-green-400";
      case "busy":
        return "text-orange-600 dark:text-orange-400";
      case "offline":
        return "text-gray-600 dark:text-gray-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

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

  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow p-4">
      {/* Technician Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              {technician.name.charAt(0)}
            </div>
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 ${getStatusColor(
                technician.status
              )} rounded-full border-2 border-white dark:border-gray-800`}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {technician.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {technician.email}
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-semibold capitalize ${getStatusTextColor(
            technician.status
          )}`}
        >
          {technician.status}
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <Activity className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-blue-600 dark:text-blue-400">
              Total
            </span>
          </div>
          <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
            {technician.totalIncidents}
          </p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <Clock className="w-3 h-3 text-orange-600 dark:text-orange-400" />
            <span className="text-xs text-orange-600 dark:text-orange-400">
              Active
            </span>
          </div>
          <p className="text-xl font-bold text-orange-700 dark:text-orange-300">
            {technician.inProgressIncidents}
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
            <span className="text-xs text-green-600 dark:text-green-400">
              Today
            </span>
          </div>
          <p className="text-xl font-bold text-green-700 dark:text-green-300">
            {technician.resolvedToday}
          </p>
        </div>
      </div>

      {/* Incidents Breakdown */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Open Incidents
          </span>
          <span className="font-bold text-red-600 dark:text-red-400">
            {technician.openIncidents}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            High Priority
          </span>
          <span className="font-bold text-orange-600 dark:text-orange-400">
            {technician.highPriorityCount}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Last Activity
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {technician.lastActivity}
          </span>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 mb-3">
        <div className="flex items-center gap-1 mb-1">
          <TrendingUp className="w-3 h-3 text-gray-600 dark:text-gray-400" />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Avg Resolution Time
          </span>
        </div>
        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
          {technician.avgResolutionTime}
        </p>
      </div>

      {/* Workload Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Workload
          </span>
          <span
            className={`text-xs font-bold ${getWorkloadTextColor(
              technician.workloadPercentage
            )}`}
          >
            {technician.workloadPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${getWorkloadColor(
              technician.workloadPercentage
            )} transition-all duration-500 rounded-full`}
            style={{ width: `${technician.workloadPercentage}%` }}
          />
        </div>
        {technician.workloadPercentage >= 80 && (
          <div className="flex items-center gap-1 mt-1">
            <AlertTriangle className="w-3 h-3 text-red-500" />
            <span className="text-xs text-red-600 dark:text-red-400">
              Overloaded
            </span>
          </div>
        )}
      </div>

      {/* View Details Button */}
      {onViewDetails && (
        <button
          onClick={() => onViewDetails(technician.id)}
          className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          View Details
        </button>
      )}
    </div>
  );
}
