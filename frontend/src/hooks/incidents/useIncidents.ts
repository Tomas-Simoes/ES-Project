import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import type { IncidentDTO } from "../../types/incident";
import { mockIncidents } from "../../mocks/incidents";

export function useIncidents(teamId?: string) {
  const [incidents, setIncidents] = useState<IncidentDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const endpoint = teamId
        ? `/api/teams/${teamId}/incidents`
        : `/api/incidents`;
      const res = await axios.get<IncidentDTO[]>(endpoint);
      setIncidents(Array.isArray(res.data) ? res.data : mockIncidents);
    } catch (err) {
      console.error("Error fetching incidents:", err);
      setIncidents(mockIncidents);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  const fetchIncidentsForTechnician = useCallback(
    async (technicianId: string) => {
      try {
        const res = await axios.get<IncidentDTO[]>(
          `/api/technician/${technicianId}/incidents`
        );
        return res.data;
      } catch (err) {
        console.error("Failed to fetch technician incidents:", err);
        return [];
      }
    },
    []
  );

  // FIX: Corrigido o template literal incorreto
  const fetchIncidentsForTeam = useCallback(async (teamId: string) => {
    try {
      const res = await axios.get<IncidentDTO[]>("/api/incidents", {
        params: { teamId },
      });
      return res.data;
    } catch (err) {
      console.error("Failed to fetch team incidents:", err);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    incidents,
    loading,
    error,
    refetch: fetchData,
    fetchIncidentsForTechnician,
    fetchIncidentsForTeam,
  };
}
