import { useState, useEffect, useMemo } from "react";
import MyIncidentStats from "../components/myIncidents/MyIncidentStats";
import IncidentList from "../components/myIncidents/IncidentList";
import UrgentPanel from "../components/myIncidents/UrgentPanel";
import WeeklySummary from "../components/myIncidents/WeeklySummary";
import PriorityBreakdown from "../components/myIncidents/PriorityBreakdown";
import { useMe } from "../hooks/auth/useMe";
import { useIncidents } from "../hooks/incidents/useIncidents";
import type { IncidentDTO } from "../types/incident";
import Loading from "./Loading";

export default function MyIncidents() {
  const [filter, setFilter] = useState<
    "all" | "open" | "in-progress" | "resolved"
  >("all");
  const [myIncidents, setMyIncidents] = useState<IncidentDTO[]>([]);
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  const { me, refetch: refetchMe } = useMe();
  console.log(me);
  const { fetchIncidentsForTechnician } = useIncidents(me?.teamId);

  // 1. Garante que temos o usuário
  useEffect(() => {
    if (!me) {
      refetchMe();
    }
  }, [me, refetchMe]);

  useEffect(() => {
    let isMounted = true;
    console.log("test");
    async function loadData() {
      console.log("test2");

      if (me?.userId) {
        console.log("test1");

        try {
          setIsLocalLoading(true);
          console.log("Buscando incidentes para técnico:", me.id);
          const data = await fetchIncidentsForTechnician(me.id);

          if (isMounted) {
            setMyIncidents(data || []);
          }
        } catch (error) {
          console.error("Erro no carregamento local:", error);
        } finally {
          if (isMounted) setIsLocalLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [me?.userId, fetchIncidentsForTechnician]);

  const filteredIncidents = useMemo(() => {
    return myIncidents.filter((inc) => {
      if (filter === "all") return true;
      const statusMap: Record<string, string> = {
        open: "Open",
        "in-progress": "In Progress",
        resolved: "Resolved",
      };
      return inc.status === statusMap[filter];
    });
  }, [myIncidents, filter]);

  const stats = useMemo(
    () => ({
      total: myIncidents.length,
      open: myIncidents.filter((i) => i.status === "Open").length,
      inProgress: myIncidents.filter((i) => i.status === "In Progress").length,
      resolved: myIncidents.filter((i) => i.status === "Resolved").length,
    }),
    [myIncidents]
  );

  const urgentIncidents = useMemo(() => {
    return myIncidents
      .filter((i) => i.priority === "High" && i.status !== "Resolved")
      .slice(0, 3);
  }, [myIncidents]);

  // Renderização condicional
  if (!me || isLocalLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          My Incidents
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage and track your assigned incidents
        </p>
      </div>

      <MyIncidentStats
        open={stats.open}
        inProgress={stats.inProgress}
        resolved={stats.resolved}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncidentList
            incidents={filteredIncidents}
            filter={filter}
            onFilterChange={setFilter}
            stats={stats}
          />
        </div>

        <div className="space-y-4">
          <UrgentPanel incidents={urgentIncidents} />
          <WeeklySummary />
          <PriorityBreakdown incidents={myIncidents} />
        </div>
      </div>
    </div>
  );
}
