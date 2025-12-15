import { useState, useEffect } from "react";
import type { Technician } from "../../types/user";
import { mockTechnicians } from "../../mocks/technicans";
import axios from "axios";

export function useTechnicians(teamId?: string) {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Technicians state updated:", technicians);
  }, [technicians]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Technician[]>("/technicians", {
          params: teamId ? { teamId } : undefined,
        });
        console.log("Fetched technicians:", res.data);

        if (!Array.isArray(res.data)) setTechnicians(mockTechnicians);
        else setTechnicians(res.data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        setTechnicians(mockTechnicians);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, [teamId]);

  return { technicians, loading, error, setTechnicians };
}
