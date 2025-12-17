import { useEffect } from "react";
import TeamsOverview from "../components/teams/TeamsOverview";
import IncidentTable from "../components/incidents/table/IncidentTable";
import { useTeams } from "../hooks/teams/useTeams";
import { useAssignTeams } from "../hooks/teams/useAssignTeams";
import { useIncidents } from "../hooks/incidents/useIncidents";
import { useMe } from "../hooks/auth/useMe";
import Error from "./Error";
import Loading from "./Loading";
import { useTeamWithMetrics } from "../hooks/teams/useTeamMetrics";

export default function Manager() {
  const { me, refetch: refetchMe } = useMe();

  const {
    incidents,
    loading: incidentLoading,
    error: incidentError,
    fetchIncidentsForTeam,
  } = useIncidents(me?.teamId);

  const {
    teams,
    loading: teamsLoading,
    error: teamsError,
    refetch,
  } = useTeams();

  const { assignTeam, error: assignError } = useAssignTeams();

  const { teamsMetrics, metricsLoading, setTeamMetrics } = useTeamWithMetrics(
    me?.teamId
  );

  // Garante que temos o usuário
  useEffect(() => {
    if (!me) {
      refetchMe();
    }
  }, [me, refetchMe]);

  const handleAssign = async (incidentId: string, teamId: string) => {
    console.log("handle assign");
    const success = await assignTeam(incidentId, teamId);
    if (success) {
      refetch?.();
    }
  };

  if (!me || incidentLoading || teamsLoading || metricsLoading)
    return <Loading />;

  if (incidentError || teamsError || assignError)
    return (
      <Error
        message={incidentError ?? teamsError ?? assignError ?? undefined}
      />
    );
  console.log(teamsMetrics);
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

      <TeamsOverview teamsMetrics={teamsMetrics} />

      <IncidentTable
        incidents={incidents}
        teams={teams}
        onAssignTeams={handleAssign}
      />
    </div>
  );
}
