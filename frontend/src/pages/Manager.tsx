import TeamsOverview from "../components/teams/TeamsOverview";
import IncidentTable from "../components/incidents/table/IncidentTable";
import { useTeams } from "../hooks/teams/useTeams";
import { useAssignTeams } from "../hooks/teams/useAssignTeams";
import { useIncidents } from "../hooks/incidents/useIncidents";
import Error from "./Error";
import Loading from "./Loading";

export default function Manager() {
  const {
    incidents,
    loading: incidentLoading,
    error: incidentError,
  } = useIncidents(); // TODO: Pass teamId based on logged-in user

  const {
    teams,
    loading: teamsLoading,
    error: teamsError,
    refetch,
  } = useTeams();

  const { assignTeam, error: assignError } = useAssignTeams();

  const handleAssign = async (incidentId: string, teamId: string) => {
    const success = await assignTeam(incidentId, teamId);
    if (success) {
      refetch?.();
    }
  };

  if (incidentLoading || teamsLoading) return <Loading />;
  if (incidentError || teamsError || assignError)
    return (
      <Error
        message={incidentError ?? teamsError ?? assignError ?? undefined}
      />
    );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Incident Assignment
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Assign incidents to the most suitable team
        </p>
      </header>

      <TeamsOverview />
      <IncidentTable
        incidents={incidents}
        teams={teams}
        onAssignTeams={handleAssign}
      />
    </div>
  );
}
