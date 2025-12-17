import { useCallback, useEffect, useState } from "react";
import { api } from "../../axios";

export type Me = {
  id: string;
  name: string;
  email: string;
  role: string;
  teamId?: string;
};

export function useMe() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMe(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get("/api/auth/me");
      setMe(res.data);
    } catch {
      localStorage.removeItem("token");
      setMe(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { me, loading, refetch };
}
