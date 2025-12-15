import { Clock, User } from "lucide-react";
import { Badge } from "../incidents/util/IncidentBadges";
import { StatusIndicator } from "../incidents/util/StatusIndicator";
import type { Incident } from "../../types/incident";

interface ActiveIncidentsListProps {
  incidents: Incident[];
}

export default function ActiveIncidentsList({
  incidents,
}: ActiveIncidentsListProps) {
  const sortedIncidents = [...incidents].sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Active Incidents
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Sorted by priority
        </p>
      </div>

      <div className="p-5 space-y-3 max-h-[500px] overflow-y-auto">
        {sortedIncidents.length > 0 ? (
          sortedIncidents.map((incident) => {
            const priorityColor =
              incident.priority === "High"
                ? "red"
                : incident.priority === "Medium"
                ? "yellow"
                : "green";
            return (
              <div
                key={incident.id}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        #{incident.id}
                      </span>
                      <Badge label={incident.priority} color={priorityColor} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {incident.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {incident.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-4">
                    <StatusIndicator status={incident.status} />
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <User size={14} />
                      <span>{incident.owner?.name || "Unassigned"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} />
                    <span>
                      {new Date(incident.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>No active incidents</p>
          </div>
        )}
      </div>
    </div>
  );
}
