import { useState } from "react";
import axios from "axios";

export function useAssignTechnicians() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assignTechnicians = async (
    incidentId: string,
    assigments: string[]
  ) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`/api/incidents/${incidentId}/assign`, {
        technicianIds: assigments,
      });
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const unassignTechnicians = async (
    incidentId: string,
    technicianId: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`/api/incidents/${incidentId}/unassign`, {
        technicianId: technicianId,
      });
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { assignTechnicians, unassignTechnicians, loading, error };
}
