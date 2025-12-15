import { useState, useEffect } from "react";
import type { Technician } from "../../types/user";
import { mockTechnicians } from "../../mocks/technicans";
import axios from "axios";

export function useTechnicians() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Technician[]>("/technicians");

        console.log("Fetched technicians:", res.data);
        setTechnicians(Array.isArray(res.data) ? res.data : mockTechnicians);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        setTechnicians(mockTechnicians);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  return { technicians, loading, error, setTechnicians };
}
