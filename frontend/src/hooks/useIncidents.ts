import { useState, useEffect } from "react";
import axios from "axios";
import type { IncidentDTO } from "../types/incident";
import { mockIncidents } from "../mocks/incidents";

export function useIncidents() {
  const [incidents, setIncidents] = useState<IncidentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get<IncidentDTO[]>("/incidents");
        console.log("Fetched incidents:", res.data);

        if (!Array.isArray(res.data)) setIncidents(mockIncidents);
        else setIncidents(res.data);
      } catch (err: unknown) {
        if (err instanceof Error)
          setError(err.message || "Error fetching incidents");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { incidents, setIncidents, loading, error };
}
