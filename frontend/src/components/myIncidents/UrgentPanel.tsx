import React from "react";
import { AlertCircle } from "lucide-react";
import { Badge } from "../incidents/util/IncidentBadges";
import type { Incident } from "../../types/incident";

interface UrgentPanelProps {
  incidents: Incident[];
}

export default function UrgentPanel({ incidents }: UrgentPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <AlertCircle className="text-red-500" size={20} />
        Urgent Items
      </h3>
      {incidents.length > 0 ? (
        <div className="space-y-3">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-red-600 dark:text-red-400">
                  #{incident.id}
                </span>
                <Badge label={incident.status} color="red" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                {incident.title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {incident.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
          No urgent incidents
        </p>
      )}
    </div>
  );
}
