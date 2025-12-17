import { useCallback, useEffect, useState } from "react";
import { api } from "../../axios";

export type Me = {
  userId: string;
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

      const res = await api.get<Me>("/api/auth/me");
      let meData = res.data;

      if (!meData.teamId) {
        try {
          console.log(meData.userId);
          const teamRes = await api.get<{ teamId: string }>(
            `/api/teams/by-user/${meData.userId}`
          );

          console.log(teamRes.data);

          meData = {
            ...meData,
            teamId: teamRes.data.teamId,
          };
        } catch (error) {
          console.error("Erro ao buscar equipa:", error);
        }
      }

      // 3️⃣ Guardar objeto completo
      setMe(meData);
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
