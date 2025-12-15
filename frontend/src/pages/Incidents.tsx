import { useState, useEffect } from "react";
import IncidentTable from "../components/incidents/table/IncidentTable";
import TechniciansOverview from "../components/technicians/TechniciansOverview";
import { useIncidents } from "../hooks/useIncidents";
import { mockIncidents } from "../mocks/incidents";

/**
 ** Endpoint: GET /api/incidents
 * Example response:
 * [
 *   {
 *     id: "inc-1",
 *     title: "Server Down",
 *     description: "Server is down, needs attention",
 *     status: "In Progress",
 *     priority: "High",
 *     createdAt: "2025-12-25T09:30:00.000Z",
 *     ownerId: "user-1",
 *     teamId: "team-1",
 *     owner: { id: "user-1", name: "Alice", email: "alice@example.com" },
 *     team: { id: "team-1", name: "Backend Team", leaderId: "user-2" }
 *   },
 *   ...
 * ]
 *
 ** Endpoint: GET /api/technician
 * Example response:
 *    [
 *      { id: "t1", name: "Alice Johnson", email: "alice@company.com", role: "technician", teamId: "team-1" },
 *      { id: "t2", name: "Bob Smith", email: "bob@company.com", role: "technician", teamId: "team-2" },
 *      ...
 *    ]
 *
 ** Endpoint: GET /api/technician/metrics
 * Example response:
 * [
 *   {
 *     id: "t1",
 *     name: "Alice Johnson",
 *     email: "alice@company.com",
 *     status: "busy",
 *     totalIncidents: 24,
 *     openIncidents: 3,
 *     inProgressIncidents: 5,
 *     resolvedToday: 4,
 *     avgResolutionTime: "2.3h",
 *     workloadPercentage: 85,
 *     lastActivity: "5 min ago",
 *     highPriorityCount: 2,
 *     teamId: "team-1",
 *     team: { id: "team-1", name: "Backend Team", leaderId: "user-2" }
 *   },
 *   ...
 * ]
 */

export default function Incidents() {
  const { incidents, loading, error } = useIncidents();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-6 relative">
      <TechniciansOverview />
      <IncidentTable incidents={incidents} />
    </div>
  );
}
