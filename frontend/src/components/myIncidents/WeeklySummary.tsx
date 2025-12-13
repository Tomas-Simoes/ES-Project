import React from "react";

export default function WeeklySummary() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        This Week
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            New Incidents
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            2
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Resolved
          </span>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            1
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Hours Worked
          </span>
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            12.5
          </span>
        </div>
      </div>
    </div>
  );
}
