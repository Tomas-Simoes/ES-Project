import { User } from "lucide-react";
import type { Technician } from "../../types/technician";

interface TechnicianStat {
  technician: Technician;
  total: number;
  active: number;
  resolved: number;
  highPriority: number;
}

interface TechnicianPerformanceProps {
  technicianStats: TechnicianStat[];
}

export default function TechnicianPerformance({
  technicianStats,
}: TechnicianPerformanceProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Technician Performance
        </h2>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          {technicianStats.map((stat) => (
            <div
              key={stat.technician.id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <User
                      className="text-blue-600 dark:text-blue-400"
                      size={20}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {stat.technician.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.technician.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.total}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Total incidents
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    {stat.active}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Active
                  </p>
                </div>
                <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {stat.resolved}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Resolved
                  </p>
                </div>
                <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">
                    {stat.highPriority}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    High Priority
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
