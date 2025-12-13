import { useState } from "react";
import IncidentTable from "../components/incidents/table/IncidentTable";
import IncidentForm from "../components/incidents/IncidentForm";
import IncidentStats from "../components/incidents/stats/IncidentStatistics";
import { RoleRender } from "../components/RoleRender";
import type { Incident } from "../types/incident";
import { mockTechnicians, mockIncidents } from "../mocks/incidents";

export default function Incidents() {
  const [showForm, setShowForm] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);

  const handleCreateIncident = (
    incident: Omit<Incident, "id" | "created_at">
  ) => {
    const newIncident: Incident = {
      ...incident,
      id: incidents.length + 1,
      created_at: new Date(),
    };
    setIncidents([...incidents, newIncident]);
  };

  const total = incidents.length;
  const open = incidents.filter((i) => i.status === "Open").length;
  const inProgress = incidents.filter((i) => i.status === "In Progress").length;
  const highPriority = incidents.filter((i) => i.priority === "High").length;

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center relative">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Incidents
        </h1>
        <RoleRender allowedRoles={["admin", "manager"]}>
          <div className="relative">
            <button
              onClick={() => setShowForm(!showForm)}
              className="py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-md hover:shadow-lg transition"
            >
              New Incident
            </button>
            {showForm && (
              <IncidentForm
                technicians={mockTechnicians}
                onCreate={handleCreateIncident}
                onClose={() => setShowForm(false)}
              />
            )}
          </div>
        </RoleRender>
      </div>

      {/* Modern statistics */}
      <IncidentStats
        total={total}
        open={open}
        inProgress={inProgress}
        highPriority={highPriority}
      />

      {/* Incident table */}
      <IncidentTable incidents={incidents} />
    </div>
  );
}
