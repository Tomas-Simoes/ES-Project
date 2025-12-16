import React, { useEffect, useState } from "react";
import {
  Activity,
  Server,
  Globe,
  Terminal,
  Cpu,
  MemoryStick,
  HardDrive,
  AlertTriangle,
  Clock,
  TrendingUp,
} from "lucide-react";

/* =======================
   Mock data for backend metrics
   ======================= */
const generateBackendMetrics = () => ({
  apm: {
    p95: `${Math.floor(Math.random() * 100 + 180)}ms`,
    throughput: `${(Math.random() * 0.8 + 1).toFixed(1)}k rpm`,
    errorRate: `${(Math.random() * 1.5).toFixed(1)}%`,
  },
  infra: {
    cpu: Math.floor(Math.random() * 30 + 30),
    ram: Math.floor(Math.random() * 25 + 55),
    disk: Math.floor(Math.random() * 20 + 25),
  },
  logs: [
    "[ERROR] PaymentService timeout",
    "[WARN] High login retry rate",
    "[INFO] Nightly backup completed",
    "[INFO] Healthcheck OK",
    "[ERROR] Redis connection dropped",
  ],
});

/* =======================
   UI Primitives
   ======================= */
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-900/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
    {children}
  </div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4">{children}</div>
);

const Kpi = ({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: any;
  accent: string;
}) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
    <Icon className={`w-5 h-5 ${accent}`} />
    <div>
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-lg font-semibold text-white">{value}</div>
    </div>
  </div>
);

/* =======================
   Dashboard
   ======================= */
export default function ObservabilityDashboard() {
  const [backendMetrics, setBackendMetrics] = useState(
    generateBackendMetrics()
  );
  const [rumMetrics, setRumMetrics] = useState({
    users: 0,
    lcp: "...",
    fid: "...",
    cls: "...",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Função para buscar dados reais do RUM via Performance API
  const fetchRealRumData = () => {
    try {
      // Buscar Web Vitals do performance API do navegador
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType("paint");

      // LCP - Largest Contentful Paint
      let lcp = "...";
      const lcpEntry = paint.find(
        (entry) => entry.name === "largest-contentful-paint"
      );
      if (lcpEntry) {
        lcp = `${(lcpEntry.startTime / 1000).toFixed(2)}s`;
      } else if (paint.length > 0) {
        // Fallback para first-contentful-paint
        const fcpEntry = paint.find(
          (entry) => entry.name === "first-contentful-paint"
        );
        if (fcpEntry) {
          lcp = `${(fcpEntry.startTime / 1000).toFixed(2)}s`;
        }
      }

      // FID - First Input Delay (aproximado via domInteractive)
      let fid = "...";
      if (navigation) {
        const inputDelay = navigation.domInteractive - navigation.fetchStart;
        fid = `${Math.floor(inputDelay)}ms`;
      }

      // CLS - Cumulative Layout Shift (valor simulado - requer LayoutShift observer em produção)
      const cls = (Math.random() * 0.15).toFixed(2);

      // Active users (simulado - em produção viria do RUM analytics)
      const users = Math.floor(Math.random() * 200 + 250);

      setRumMetrics({
        users,
        lcp,
        fid,
        cls,
      });

      console.log("RUM Metrics updated:", { users, lcp, fid, cls });
    } catch (error) {
      console.error("Error fetching RUM data:", error);
      setRumMetrics({
        users: 0,
        lcp: "N/A",
        fid: "N/A",
        cls: "N/A",
      });
    }
  };

  useEffect(() => {
    // Buscar dados RUM na montagem inicial
    fetchRealRumData();

    // Auto-refresh a cada 2 segundos
    const interval = setInterval(() => {
      fetchRealRumData();
      setBackendMetrics(generateBackendMetrics());
    }, 2000);

    // Cleanup do interval quando o componente desmontar
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    console.log("Refreshing all metrics...");

    // Atualizar RUM com dados reais do frontend
    fetchRealRumData();

    // Atualizar backend metrics (mock - futuramente será um fetch ao endpoint)
    // TODO: Substituir por: fetch('/api/metrics').then(...)
    setBackendMetrics(generateBackendMetrics());

    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="min-h-screen text-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Server Monitoring
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Monitor your server workload and performance
          </p>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Kpi
            label="Active Users"
            value={rumMetrics.users}
            icon={Globe}
            accent="text-blue-400"
          />
          <Kpi
            label="P95 Latency"
            value={backendMetrics.apm.p95}
            icon={TrendingUp}
            accent="text-green-400"
          />
          <Kpi
            label="Error Rate"
            value={backendMetrics.apm.errorRate}
            icon={AlertTriangle}
            accent="text-yellow-400"
          />
          <Kpi
            label="CPU Usage"
            value={`${backendMetrics.infra.cpu}%`}
            icon={Cpu}
            accent="text-purple-400"
          />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - RUM & APM */}
          <div className="space-y-6">
            {/* RUM */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold">Real User Monitoring</h2>
                <span className="ml-auto text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                  Live from Frontend
                </span>
              </div>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Kpi
                    label="Active Users"
                    value={rumMetrics.users}
                    icon={Globe}
                    accent="text-blue-400"
                  />
                  <Kpi
                    label="LCP"
                    value={rumMetrics.lcp}
                    icon={Clock}
                    accent="text-green-400"
                  />
                  <Kpi
                    label="FID"
                    value={rumMetrics.fid}
                    icon={Activity}
                    accent="text-yellow-400"
                  />
                  <Kpi
                    label="CLS"
                    value={rumMetrics.cls}
                    icon={TrendingUp}
                    accent="text-purple-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* APM */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-semibold">
                  Backend Performance (APM)
                </h2>
                <span className="ml-auto text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded">
                  Mock (TODO: API)
                </span>
              </div>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Kpi
                    label="P95 Latency"
                    value={backendMetrics.apm.p95}
                    icon={TrendingUp}
                    accent="text-green-400"
                  />
                  <Kpi
                    label="Throughput"
                    value={backendMetrics.apm.throughput}
                    icon={Activity}
                    accent="text-blue-400"
                  />
                  <Kpi
                    label="Error Rate"
                    value={backendMetrics.apm.errorRate}
                    icon={AlertTriangle}
                    accent="text-red-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Infrastructure */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold">Infrastructure</h2>
                <span className="ml-auto text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded">
                  Mock
                </span>
              </div>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Kpi
                    label="CPU"
                    value={`${backendMetrics.infra.cpu}%`}
                    icon={Cpu}
                    accent="text-purple-400"
                  />
                  <Kpi
                    label="RAM"
                    value={`${backendMetrics.infra.ram}%`}
                    icon={MemoryStick}
                    accent="text-blue-400"
                  />
                  <Kpi
                    label="Disk"
                    value={`${backendMetrics.infra.disk}%`}
                    icon={HardDrive}
                    accent="text-green-400"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Logs */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-yellow-400" />
                <h2 className="text-xl font-semibold">Live Logs</h2>
                <span className="ml-auto text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded">
                  Mock
                </span>
              </div>
              <CardContent>
                <div className="space-y-2 font-mono text-sm max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50">
                  {backendMetrics.logs.map((log, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded ${
                        log.includes("ERROR")
                          ? "bg-red-900/20 text-red-300"
                          : log.includes("WARN")
                          ? "bg-yellow-900/20 text-yellow-300"
                          : "bg-slate-800/50 text-slate-300"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
