// src/pages/Incidents.tsx
import { useState } from "react";
import IncidentTable from "../components/incidents/table/IncidentTable";
import IncidentForm from "../components/incidents/IncidentForm";
import IncidentStats from "../components/incidents/stats/IncidentStatistics";
import { RoleRender } from "../components/RoleRender";
import type { Incident } from "../types/incident";
import { mockTechnicians } from "../mocks/users"; // Changed import
import { mockIncidents } from "../mocks/incidents";
import TechniciansOverview from "../components/technicians/TechniciansOverview";

export default function Incidents() {
  const [showForm, setShowForm] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);

  const handleCreateIncident = (
    incident: Omit<Incident, "id" | "created_at">
  ) => {
    const newIncident: Incident = {
      ...incident,
      id: crypto.randomUUID(), // Changed to string UUID
      created_at: new Date(),
    };
    setIncidents([...incidents, newIncident]);
  };

  return (
    <div className="space-y-6 relative">
      <TechniciansOverview />
      <IncidentTable incidents={incidents} />
    </div>
  );
}
