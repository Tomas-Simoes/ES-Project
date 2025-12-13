import React from "react";
import type { Incident } from "../../types/incident";

interface PriorityBreakdownProps {
  incidents: Incident[];
}

export default function PriorityBreakdown({
  incidents,
}: PriorityBreakdownProps) {
  const priorities = [
    {
      label: "High",
      count: incidents.filter(
        (i) => i.priority === "High" && i.status !== "Resolved"
      ).length,
      color: "bg-red-500",
    },
    {
      label: "Medium",
      count: incidents.filter(
        (i) => i.priority === "Medium" && i.status !== "Resolved"
      ).length,
      color: "bg-yellow-500",
    },
    {
      label: "Low",
      count: incidents.filter(
        (i) => i.priority === "Low" && i.status !== "Resolved"
      ).length,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Priority Breakdown
      </h3>
      <div className="space-y-2">
        {priorities.map((priority) => (
          <div key={priority.label} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${priority.color}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">
              {priority.label}
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {priority.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
