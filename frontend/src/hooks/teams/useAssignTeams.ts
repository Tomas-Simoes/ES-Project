// src/hooks/teams/useAssignTeams.ts
import { useState } from "react";
import axios from "axios";

export function useAssignTeams() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assignTeam = async (incidentId: string, assigment: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(`/api/incidents/${incidentId}/assigments`, {
        assignment: assigment,
      });
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { assignTeam, loading, error };
}
