import React from "react";
import { Clock, Calendar } from "lucide-react";
import { Badge } from "../incidents/util/IncidentBadges";
import { StatusIndicator } from "../incidents/util/StatusIndicator";
import type { Incident } from "../../types/incident";

interface IncidentCardProps {
  incident: Incident;
}

export default function IncidentCard({ incident }: IncidentCardProps) {
  const priorityColor =
    incident.priority === "High"
      ? "red"
      : incident.priority === "Medium"
      ? "yellow"
      : "green";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
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

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <StatusIndicator status={incident.status} />
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Calendar size={14} />
          <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
