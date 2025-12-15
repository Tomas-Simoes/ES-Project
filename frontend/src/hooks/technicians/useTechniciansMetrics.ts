import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import type { TechnicianWithMetrics } from "../../types/user";
import { mockTechniciansMetrics } from "../../mocks/technicans";

export function useTechniciansWithMetrics(teamId?: string) {
  const [technicians, setTechnicians] = useState<TechnicianWithMetrics[]>([]);
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

        const res = await axios.get<TechnicianWithMetrics[]>(
          "/api/technician/metrics",
          {
            params: teamId ? { teamId } : undefined,
          }
        );

        console.log("Fetched technicians metrics:", res.data);

        setTechnicians(
          Array.isArray(res.data) ? res.data : mockTechniciansMetrics
        );
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

        setTechnicians(mockTechniciansMetrics);
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
    technicians,
    loading,
    refreshing, // opcional para spinner pequeno
    error,
    refetch: fetchData, // refetch(true)
    setTechnicians,
  };
}
