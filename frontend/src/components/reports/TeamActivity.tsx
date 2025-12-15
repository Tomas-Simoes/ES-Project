import React from "react";
import { Clock } from "lucide-react";
import type { Incident } from "../../types/incident";

interface TeamActivityProps {
  incidents: Incident[];
}

export default function TeamActivity({ incidents }: TeamActivityProps) {
  const recentActivity = [...incidents]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const getActivityText = (incident: Incident) => {
    if (incident.status === "Resolved") {
      return `Resolved "${incident.title}"`;
    } else if (incident.status === "In Progress") {
      return `Working on "${incident.title}"`;
    } else {
      return `Created "${incident.title}"`;
    }
  };

  const getActivityColor = (incident: Incident) => {
    if (incident.status === "Resolved")
      return "text-emerald-600 dark:text-emerald-400";
    if (incident.status === "In Progress")
      return "text-blue-600 dark:text-blue-400";
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>

      <div className="space-y-3">
        {recentActivity.map((incident) => (
          <div key={incident.id} className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Clock size={14} className="text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${getActivityColor(
                  incident
                )} truncate`}
              >
                {incident.owner?.name || "Unassigned"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {getActivityText(incident)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {new Date(incident.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
