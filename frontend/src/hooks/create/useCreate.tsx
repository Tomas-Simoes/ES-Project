// hooks/admin/useCreate.ts
import { useState, useCallback } from "react";
import axios from "axios";
import type { CreateTeamLeaderForm } from "../../types/create";

interface CreateIncidentPayload {
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High" | "Critical";
  teamId?: string;
  ownerId?: string;
}

interface CreateTeamPayload {
  name: string;
  description: string;
  leaderId?: string;
}

/* =======================
   useCreateIncident Hook
   ======================= */
export function useCreateIncident() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createIncident = useCallback(async (data: CreateIncidentPayload) => {
    try {
      setLoading(true);
      setError(null);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
      };

      const res = await axios.post("/api/incidents", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Incident created:", res.data);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.status, err.response?.data);
        const errorMsg = `Failed to create incident: ${
          err.response?.status
        } ${JSON.stringify(err.response?.data)}`;
        setError(errorMsg);
        throw new Error(errorMsg);
      } else if (err instanceof Error) {
        console.error("Error:", err.message);
        setError(err.message);
        throw err;
      } else {
        console.error("Unknown error", err);
        const errorMsg = "Unknown error creating incident";
        setError(errorMsg);
        throw new Error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { createIncident, loading, error };
}

export function useCreateTeam() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createTeam = useCallback(async (data: CreateTeamPayload) => {
    try {
      setLoading(true);
      setError(null);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        name: data.name,
        description: data.description,
      };

      if (data.leaderId) payload.leaderId = data.leaderId;

      const res = await axios.post("/api/teams", payload);
      console.log("Team created:", res.data);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.status, err.response?.data);
        const errorMsg = `Failed to create team: ${
          err.response?.status
        } ${JSON.stringify(err.response?.data)}`;
        setError(errorMsg);
        throw new Error(errorMsg);
      } else if (err instanceof Error) {
        console.error("Error:", err.message);
        setError(err.message);
        throw err;
      } else {
        console.error("Unknown error", err);
        const errorMsg = "Unknown error creating team";
        setError(errorMsg);
        throw new Error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { createTeam, loading, error };
}

export function useCreateTeamLeader() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createTeamLeader = useCallback(
    async (teamId: string, leaderId: string) => {
      try {
        setLoading(true);
        setError(null);

        // 1️⃣ Assign leader à team
        const teamRes = await axios.put(`/api/teams/${teamId}/leader`, {
          leaderId,
        });

        // 2️⃣ Atualizar role do user para TEAM_LEADER
        const roleRes = await axios.patch(`/api/users/${leaderId}/role`, {
          role: "TEAM_LEADER",
        });

        console.log("Team leader assigned:", teamRes.data);
        console.log("User role updated:", roleRes.data);

        return {
          team: teamRes.data,
          user: roleRes.data,
        };
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Axios error:",
            err.response?.status,
            err.response?.data
          );
          const errorMsg = `Failed to assign team leader: ${
            err.response?.status
          } ${JSON.stringify(err.response?.data)}`;
          setError(errorMsg);
          throw new Error(errorMsg);
        } else if (err instanceof Error) {
          setError(err.message);
          throw err;
        } else {
          const errorMsg = "Unknown error assigning team leader";
          setError(errorMsg);
          throw new Error(errorMsg);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createTeamLeader, loading, error };
}

/* =======================
   Combined Hook (Optional)
   ======================= */
export function useCreate() {
  const incident = useCreateIncident();
  const technician = useCreateIncident();
  const teamLeader = useCreateTeamLeader();
  const team = useCreateTeam();

  return {
    incident,
    technician,
    teamLeader,
    team,
  };
}
