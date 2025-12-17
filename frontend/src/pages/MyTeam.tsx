import IncidentTable from "../components/incidents/table/IncidentTable";
import TechniciansOverview from "../components/technicians/TechniciansOverview";
import { useTechniciansWithMetrics } from "../hooks/technicians/useTechniciansMetrics";
import { useAssignTechnicians } from "../hooks/technicians/useAssignTechnicians";
import { useIncidents } from "../hooks/incidents/useIncidents";
import Loading from "./Loading";
import Error from "./Error";
import { useEffect } from "react";

/**
 ** Endpoint: GET /api/incidents?teamId=team-1
 * Fetches a list of incidents for a specific team.
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
 *
 ** Endpoint: PATCH /api/incidents/:incidentId/assigments
 *  Updates the ownerId (assigned technician) of a specific incident.
 *  Example request:
 *   Body: {
 *     "assignments":
 *        [
 *          {
 *            technicianId: "t1",
 *          }
 *        ]
 *   }
 *
 *   Example response:
 *   {
 *     "id": "inc-1",
 *     "title": "Server Down",
 *     "description": "Server is down, needs attention",
 *     "status": "In Progress",
 *     "priority": "High",
 *     "createdAt": "2025-12-25T09:30:00.000Z",
 *     "ownerId": "t1",                                           --------> updated ownerId
 *     "teamId": "team-1",
 *     "owner": { "id": "t1", "name": "Alice Johnson", "email": "alice@company.com" },
 *     "team": { "id": "team-1", "name": "Backend Team", "leaderId": "user-2" }
 *   }
 *
 ** Endpoint: GET /api/technician?teamId=team-1
 * Fetches a list of technicians for a specific team.
 * Example response:
 *    [
 *      { id: "t1", name: "Alice Johnson", email: "alice@company.com", role: "technician", teamId: "team-1" },
 *      { id: "t2", name: "Bob Smith", email: "bob@company.com", role: "technician", teamId: "team-2" },
 *      ...
 *    ]
 *
 ** Endpoint: GET /api/technician/metrics?teamId=team-1
 * Fetches technicians and their metrics for a specific team.
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
import { useMe } from "../hooks/auth/useMe";

export default function MyTeam() {
  const { me, loading: meLoading } = useMe();

  const teamId = me?.teamId;

  const {
    incidents,
    loading: incidentLoading,
    error: incidentError,
    fetchTechniciansForIncidents,
  } = useIncidents(teamId);

  const {
    technicians,
    loading: techLoading,
    refreshing: UI_techRefreshing,
    error: techError,
    refetch: refetchTechs,
  } = useTechniciansWithMetrics(teamId);

  const {
    assignTechnicians,
    unassignTechnicians,
    error: assignError,
  } = useAssignTechnicians();

  useEffect(() => {
    if (!teamId) return;
    fetchTechniciansForIncidents().then(console.log);
  }, [teamId, fetchTechniciansForIncidents]);

  if (meLoading) return <Loading />;

  if (incidentError || techError || assignError)
    return (
      <Error message={incidentError ?? techError ?? assignError ?? undefined} />
    );

  return (
    <div className="space-y-6 relative">
      {(incidentLoading || techLoading) && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
          <Loading />
        </div>
      )}

      {UI_techRefreshing && (
        <div className="absolute top-2 right-2 z-40">
          <Loading small />
        </div>
      )}

      <TechniciansOverview technicians={technicians} />

      <IncidentTable
        incidents={incidents}
        technicians={technicians}
        fetchIncidentsForTechnicians={fetchTechniciansForIncidents}
        onAssignTechnicians={async (incidentId, techIds) => {
          const success = await assignTechnicians(incidentId, techIds);
          if (success) refetchTechs?.(true);
        }}
        onUnassignTechnicians={async (incidentId, techId) => {
          const success = await unassignTechnicians(incidentId, techId);
          if (success) refetchTechs?.(true);
        }}
      />
    </div>
  );
}
