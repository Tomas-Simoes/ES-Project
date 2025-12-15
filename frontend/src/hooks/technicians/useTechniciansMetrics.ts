import { useState, useEffect } from "react";
import type { TechnicianWithMetrics } from "../../types/user";
import { mockTechniciansMetrics } from "../../mocks/technicans";
import axios from "axios";

export function useTechniciansWithMetrics() {
  const [technicians, setTechnicians] = useState<TechnicianWithMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true);
        const res = await axios.get<TechnicianWithMetrics[]>(
          "/technicians/metrics"
        );

        console.log("Fetched technicians metrics:", res.data);
        setTechnicians(
          Array.isArray(res.data) ? res.data : mockTechniciansMetrics
        );
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        setTechnicians(mockTechniciansMetrics);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  return { technicians, loading, error, setTechnicians };
}
