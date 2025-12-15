import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import type {
  IncidentDTO,
  IncidentForTechnicianAssignment,
} from "../../types/incident";
import { mockIncidents } from "../../mocks/incidents";
import type { Technician } from "../../types/user";

export function useIncidents(teamId?: string) {
  const [incidents, setIncidents] = useState<IncidentDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!teamId) {
        throw new Error("teamId is required");
      }

      const res = await axios.get<IncidentDTO[]>(
        `/api/teams/${teamId}/incidents`
      );

      console.log("Fetched incidents:", res.data);

      if (Array.isArray(res.data)) {
        setIncidents(res.data);
      } else {
        setIncidents(mockIncidents);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.status, err.response?.data);
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
        setError("Unknown error fetching incidents");
      }
      setIncidents(mockIncidents);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  const fetchTechniciansForIncidents = useCallback(async () => {
    const result: Record<string, Technician[]> = {}; // incidentId -> technicians[]

    try {
      if (incidents.length === 0) return result;

      const responses = await Promise.all(
        incidents.map((incident) =>
          axios
            .get<IncidentForTechnicianAssignment>(
              `/api/incidents/${incident.id}`
            )
            .then((res) => ({
              id: res.data.id,
              technicians: res.data.technicians || [],
            }))
            .catch((err) => {
              console.error(`Failed to fetch incident ${incident.id}:`, err);
              return { id: incident.id, technicians: [] };
            })
        )
      );

      // Convert to { incidentId: techniciansArray }
      responses.forEach((r) => {
        result[r.id] = r.technicians;
      });

      return result;
    } catch (err) {
      console.error("Error fetching technicians for all incidents", err);
      return result;
    }
  }, [incidents]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    incidents,
    loading,
    error,
    refetch: fetchData,
    fetchTechniciansForIncidents,
  };
}
