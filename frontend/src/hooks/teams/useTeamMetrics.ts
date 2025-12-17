import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { mockTechniciansMetrics } from "../../mocks/technicans";
import type { TeamWithMetrics } from "../../types/team";

export function useTeamWithMetrics(teamId?: string) {
  const [teamsMetrics, setTeamMetrics] = useState<TeamWithMetrics[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // first load
  const [refreshing, setRefreshing] = useState<boolean>(false); // silent refresh
  const [error, setError] = useState<string | null>(null);

  const isFirstLoad = useRef(true);

  const fetchData = useCallback(
    async (silent = false) => {
      try {
        if (silent && !isFirstLoad.current) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError(null);
        console.log("yyy" + teamId);
        const res = await axios.get<TeamWithMetrics[]>(
          `/api/teams/all/metrics`
        );

        console.log("Fetched technicians metrics:", res.data);

        setTeamMetrics(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Axios error:",
            err.response?.status,
            err.response?.data
          );
          setError(
            `Axios error: ${err.response?.status} ${JSON.stringify(
              err.response?.data
            )}`
          );
        } else if (err instanceof Error) {
          console.error("Error:", err.message);
          setError(err.message);
        } else {
          console.error("Unknown error", err);
          setError("Unknown error fetching technicians metrics");
        }
      } finally {
        if (silent && !isFirstLoad.current) {
          setRefreshing(false);
        } else {
          setLoading(false);
          isFirstLoad.current = false;
        }
      }
    },
    [teamId]
  );

  useEffect(() => {
    fetchData(false); // initial load
  }, [fetchData]);

  return {
    teamsMetrics,
    loading,
    refreshing, // opcional para spinner pequeno
    error,
    refetch: fetchData, // refetch(true)
    setTeamMetrics,
  };
}
