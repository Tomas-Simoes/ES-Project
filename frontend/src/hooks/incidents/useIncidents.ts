import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import type { IncidentDTO } from "../../types/incident";
import { mockIncidents } from "../../mocks/incidents";

export function useIncidents(teamId?: string) {
  const [incidents, setIncidents] = useState<IncidentDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    // Só buscamos incidentes do time se o teamId existir
    if (!teamId) return;

    try {
      setLoading(true);
      const res = await axios.get<IncidentDTO[]>(
        `/api/teams/${teamId}/incidents`
      );
      setIncidents(Array.isArray(res.data) ? res.data : mockIncidents);
    } catch (err) {
      console.error("Error fetching team incidents:", err);
      setIncidents(mockIncidents);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  // Função para buscar incidentes de UM técnico específico
  const fetchIncidentsForTechnician = useCallback(
    async (technicianId: string) => {
      try {
        const res = await axios.get<IncidentDTO[]>(
          `/api/technician/${technicianId}/incidents`
        );
        return res.data;
      } catch (err) {
        console.error(`Failed to fetch technician incidents:`, err);
        return [];
      }
    },
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    incidents,
    loading,
    error,
    refetch: fetchData,
    fetchIncidentsForTechnician,
  };
}
