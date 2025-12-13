import React from "react";
import type { Incident } from "../../types/incident";

interface IncidentDistributionProps {
  incidents: Incident[];
}

export default function IncidentDistribution({
  incidents,
}: IncidentDistributionProps) {
  const statusCounts = {
    Open: incidents.filter((i) => i.status === "Open").length,
    "In Progress": incidents.filter((i) => i.status === "In Progress").length,
    Resolved: incidents.filter((i) => i.status === "Resolved").length,
  };

  const priorityCounts = {
    High: incidents.filter((i) => i.priority === "High").length,
    Medium: incidents.filter((i) => i.priority === "Medium").length,
    Low: incidents.filter((i) => i.priority === "Low").length,
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Distribution
      </h3>

      <div className="space-y-4">
        {/* Status Distribution */}
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            By Status
          </p>
          <div className="space-y-2">
            {Object.entries(statusCounts).map(([status, count]) => {
              const total = incidents.length;
              const percentage = total > 0 ? (count / total) * 100 : 0;
              const color =
                status === "Open"
                  ? "bg-gray-500"
                  : status === "In Progress"
                  ? "bg-blue-500"
                  : "bg-emerald-500";

              return (
                <div key={status}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      {status}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${color} h-2 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            By Priority
          </p>
          <div className="space-y-2">
            {Object.entries(priorityCounts).map(([priority, count]) => {
              const color =
                priority === "High"
                  ? "bg-red-500"
                  : priority === "Medium"
                  ? "bg-yellow-500"
                  : "bg-green-500";

              return (
                <div
                  key={priority}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {priority}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
