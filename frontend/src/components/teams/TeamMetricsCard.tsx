// src/components/teams/TeamMetricsCard.tsx
import { Users, CheckCircle, Clock, TrendingUp, Activity } from "lucide-react";
import type { TeamWithMetrics } from "../../types/team"; // Importe a interface correta

interface Props {
  team: TeamWithMetrics; // Alterado para a interface correta
  onAssign?: (teamId: string) => void;
}

export default function TeamMetricsCard({ team: teamData, onAssign }: Props) {
  // Desestruturamos para facilitar o acesso
  const { team, totals } = teamData;

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
    if (total === 0) return { text: "No Staff", color: "text-gray-500" };
    const percentage = (available / total) * 100;
    if (percentage >= 50)
      return { text: "Good", color: "text-green-600 dark:text-green-400" };
    if (percentage >= 25)
      return { text: "Limited", color: "text-orange-600 dark:text-orange-400" };
    return { text: "Low", color: "text-red-600 dark:text-red-400" };
  };

  // Usamos os dados vindos de totals
  const availability = getAvailabilityStatus(
    totals.availableTechs,
    totals.totalTechs
  );

  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow p-4">
      {/* Team Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {team.name} {/* Agora acessa TeamBase */}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Team Leader ID: {team.leaderId ? team.leaderId.slice(0, 8) : "None"}
          </p>
        </div>
        <span className={`text-xs font-semibold ${availability.color}`}>
          {availability.text}
        </span>
      </div>

      {/* Technicians Status - Acessando de totals */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
          <div className="flex items-center gap-1 mb-0.5">
            <Users className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Total
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {totals.totalTechs}
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
            {totals.availableTechs}
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
            {totals.busyTechs}
          </p>
        </div>
      </div>

      {/* Incidents Overview - Acessando de totals */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Open</span>
          <span className="font-bold text-red-600 dark:text-red-400">
            {totals.openIncidents}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">In Progress</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {totals.inProgressIncidents}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Resolved Today
          </span>
          <span className="font-bold text-green-600 dark:text-green-400">
            {totals.resolvedToday}
          </span>
        </div>
      </div>

      {/* Workload Bar - Usando workloadAvgPercentage de totals */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Workload
          </span>
          <span
            className={`text-xs font-bold ${getWorkloadTextColor(
              totals.workloadAvgPercentage
            )}`}
          >
            {totals.workloadAvgPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${getWorkloadColor(
              totals.workloadAvgPercentage
            )} transition-all duration-500 rounded-full`}
            style={{ width: `${totals.workloadAvgPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
