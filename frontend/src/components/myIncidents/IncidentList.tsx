import React from "react";
import { AlertCircle } from "lucide-react";
import IncidentCard from "./IncidentCard";
import type { Incident } from "../../types/incident";

interface IncidentListProps {
  incidents: Incident[];
  filter: "all" | "open" | "in-progress" | "resolved";
  onFilterChange: (filter: "all" | "open" | "in-progress" | "resolved") => void;
  stats: {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
  };
}

export default function IncidentList({
  incidents,
  filter,
  onFilterChange,
  stats,
}: IncidentListProps) {
  const tabs = [
    { key: "all" as const, label: "All", count: stats.total },
    { key: "open" as const, label: "Open", count: stats.open },
    {
      key: "in-progress" as const,
      label: "In Progress",
      count: stats.inProgress,
    },
    { key: "resolved" as const, label: "Resolved", count: stats.resolved },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          All My Incidents
        </h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onFilterChange(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === tab.key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-3 max-h-[600px] overflow-y-auto">
        {incidents.length > 0 ? (
          incidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <AlertCircle size={48} className="mx-auto mb-3 opacity-30" />
            <p>No incidents found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
