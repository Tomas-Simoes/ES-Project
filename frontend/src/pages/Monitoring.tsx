// src/pages/Integrations.js
import React from "react";

function Integrations() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Integrations
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Link monitoring tools to this system. Placeholder actions:
      </p>
      <div className="mt-4 flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Connect Nagios
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Connect Datadog
        </button>
      </div>
    </div>
  );
}
export default Integrations;
