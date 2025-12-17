// src/hooks/teams/useTeams.ts
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { TeamDTO } from "../../types/team";
import { mockTeams } from "../../mocks/teams";

export function useTeams() {
  const [teams, setTeams] = useState<TeamDTO[]>([]);
  const [teamMetrics, setTeamMetrics] = useState<TeamDTO[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get<TeamDTO[]>("/api/teams");

      if (Array.isArray(res.data)) {
        setTeams(res.data);
      } else {
        setTeams(mockTeams);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error fetching teams");
      setTeams(mockTeams);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const fetchTeamsMetrics = useCallback(async (teamId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get<TeamDTO[]>("/api/teams");

      if (Array.isArray(res.data)) {
        setTeams(res.data);
      } else {
        setTeams(mockTeams);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error fetching teams");
      setTeams(mockTeams);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return { teams, loading, error, refetch: fetchTeams };
}
