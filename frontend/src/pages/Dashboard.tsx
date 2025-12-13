// src/pages/Dashboard.js
import React from "react";

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Summary Card */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <p className="text-gray-600 dark:text-gray-400">Total Incidents</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">42</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <p className="text-gray-600 dark:text-gray-400">Resolved</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">15</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <p className="text-gray-600 dark:text-gray-400">In Progress</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">27</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Incidents Trend
        </h2>
        <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded flex items-center justify-center text-gray-500 dark:text-gray-400">
          [Graph Placeholder]
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
