import { useState } from "react";
import TeamOverviewStats from "../components/reports/TeamOverviewStats";
import TechnicianPerformance from "../components/reports/TechnicianPerformance";
import IncidentDistribution from "../components/reports/IncidentDistribution";
import ActiveIncidentsList from "../components/reports/ActiveIncidentsList";
import TeamActivity from "../components/reports/TeamActivity";
import { mockTechnicians, mockIncidents } from "../mocks/incidents";

export default function Reports() {
  const [selectedTechnician, setSelectedTechnician] = useState<number | null>(
    null
  );

  // Calculate team statistics
  const totalIncidents = mockIncidents.length;
  const activeIncidents = mockIncidents.filter(
    (i) => i.status !== "Resolved"
  ).length;
  const resolvedToday = mockIncidents.filter((i) => {
    const today = new Date();
    return (
      i.status === "Resolved" &&
      i.created_at.toDateString() === today.toDateString()
    );
  }).length;
  const highPriorityOpen = mockIncidents.filter(
    (i) => i.priority === "High" && i.status !== "Resolved"
  ).length;

  // Filter incidents by selected technician
  const filteredIncidents = selectedTechnician
    ? mockIncidents.filter((i) => i.owner?.id === selectedTechnician)
    : mockIncidents;

  // Calculate technician workload
  const technicianStats = mockTechnicians.map((tech) => {
    const techIncidents = mockIncidents.filter((i) => i.owner?.id === tech.id);
    return {
      technician: tech,
      total: techIncidents.length,
      active: techIncidents.filter((i) => i.status !== "Resolved").length,
      resolved: techIncidents.filter((i) => i.status === "Resolved").length,
      highPriority: techIncidents.filter(
        (i) => i.priority === "High" && i.status !== "Resolved"
      ).length,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor team performance and incident distribution
          </p>
        </div>

        {/* Technician Filter */}
        <select
          value={selectedTechnician || ""}
          onChange={(e) =>
            setSelectedTechnician(
              e.target.value ? Number(e.target.value) : null
            )
          }
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Technicians</option>
          {mockTechnicians.map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.name}
            </option>
          ))}
        </select>
      </div>

      {/* Overview Stats */}
      <TeamOverviewStats
        totalIncidents={totalIncidents}
        activeIncidents={activeIncidents}
        resolvedToday={resolvedToday}
        highPriorityOpen={highPriorityOpen}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Technician Performance Cards */}
          <TechnicianPerformance technicianStats={technicianStats} />

          {/* Active Incidents List */}
          <ActiveIncidentsList
            incidents={filteredIncidents.filter((i) => i.status !== "Resolved")}
          />
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Incident Distribution */}
          <IncidentDistribution incidents={mockIncidents} />

          {/* Recent Activity */}
          <TeamActivity incidents={mockIncidents} />
        </div>
      </div>
    </div>
  );
}
