import IncidentTable from "../components/incidents/table/IncidentTable";
import TechniciansOverview from "../components/technicians/TechniciansOverview";
import { useTechniciansWithMetrics } from "../hooks/technicians/useTechniciansMetrics";
import { useIncidents } from "../hooks/useIncidents";
import Loading from "./Loading";
import Error from "./Error";

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

export default function Incidents() {
  const {
    incidents,
    loading: incidentLoading,
    error: incidentError,
  } = useIncidents(); // TODO: Pass teamId based on logged-in user

  const {
    technicians,
    loading: techLoading,
    error: techError,
  } = useTechniciansWithMetrics();

  if (incidentLoading || techLoading) return <Loading />;
  if (incidentError || techError)
    return <Error message={incidentError ?? techError ?? undefined} />;

  return (
    <div className="space-y-6 relative">
      <TechniciansOverview technicians={technicians} />
      <IncidentTable incidents={incidents} />
    </div>
  );
}
