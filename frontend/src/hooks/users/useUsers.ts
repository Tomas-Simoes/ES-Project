import { useState, useEffect } from "react";
import type { User } from "../../types/user";
import axios from "axios";

export function useUsers(teamId?: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Users state updated:", users);
  }, [users]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get<User[]>("/api/users", {
          params: teamId ? { teamId } : undefined,
        });
        console.log("Fetched users:", res.data);

        setUsers(res.data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [teamId]);

  return { users, loading, error, setUsers };
}
