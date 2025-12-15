// src/components/technicians/TechniciansOverview.tsx
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Activity,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import TechnicianMetricsCard from "./TechnicianMetricsCard";

// Hardcoded technician metrics data
const techniciansMetrics = [
  {
    id: "t1",
    name: "Alice Johnson",
    email: "alice@company.com",
    status: "busy" as const,
    totalIncidents: 24,
    openIncidents: 3,
    inProgressIncidents: 5,
    resolvedToday: 4,
    avgResolutionTime: "2.3h",
    workloadPercentage: 85,
    lastActivity: "5 min ago",
    highPriorityCount: 2,
  },
  {
    id: "t2",
    name: "Bob Smith",
    email: "bob@company.com",
    status: "available" as const,
    totalIncidents: 18,
    openIncidents: 1,
    inProgressIncidents: 2,
    resolvedToday: 6,
    avgResolutionTime: "1.8h",
    workloadPercentage: 35,
    lastActivity: "2 min ago",
    highPriorityCount: 0,
  },
  {
    id: "t3",
    name: "Charlie Brown",
    email: "charlie@company.com",
    status: "busy" as const,
    totalIncidents: 31,
    openIncidents: 4,
    inProgressIncidents: 6,
    resolvedToday: 3,
    avgResolutionTime: "3.1h",
    workloadPercentage: 90,
    lastActivity: "1 min ago",
    highPriorityCount: 3,
  },
  {
    id: "t4",
    name: "Diana Prince",
    email: "diana@company.com",
    status: "available" as const,
    totalIncidents: 20,
    openIncidents: 2,
    inProgressIncidents: 3,
    resolvedToday: 5,
    avgResolutionTime: "2.0h",
    workloadPercentage: 50,
    lastActivity: "10 min ago",
    highPriorityCount: 1,
  },
  {
    id: "t5",
    name: "Eve Martinez",
    email: "eve@company.com",
    status: "offline" as const,
    totalIncidents: 15,
    openIncidents: 1,
    inProgressIncidents: 1,
    resolvedToday: 2,
    avgResolutionTime: "1.5h",
    workloadPercentage: 20,
    lastActivity: "2 hours ago",
    highPriorityCount: 0,
  },
  {
    id: "t6",
    name: "Frank Wilson",
    email: "frank@company.com",
    status: "busy" as const,
    totalIncidents: 27,
    openIncidents: 5,
    inProgressIncidents: 4,
    resolvedToday: 3,
    avgResolutionTime: "2.7h",
    workloadPercentage: 75,
    lastActivity: "3 min ago",
    highPriorityCount: 2,
  },
];

export default function TechniciansOverview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleViewDetails = (techId: string) => {
    console.log("View details for technician:", techId);
    // Here you would navigate to technician details or open a modal
  };

  const useCarousel = techniciansMetrics.length >= 5;

  // Carousel navigation with animation
  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === 0 ? techniciansMetrics.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === techniciansMetrics.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Get visible technicians for carousel (show 4 at a time)
  const getVisibleTechnicians = () => {
    if (techniciansMetrics.length <= 4) return techniciansMetrics;

    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % techniciansMetrics.length;
      visible.push(techniciansMetrics[index]);
    }
    return visible;
  };

  // Calculate team stats
  const availableCount = techniciansMetrics.filter(
    (t) => t.status === "available"
  ).length;
  const busyCount = techniciansMetrics.filter(
    (t) => t.status === "busy"
  ).length;
  const overloadedCount = techniciansMetrics.filter(
    (t) => t.workloadPercentage >= 80
  ).length;

  return (
    <section className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Team Performance
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Monitor your technicians' workload and performance
        </p>
      </div>

      {/* Technicians Container */}
      {techniciansMetrics.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-gray-500 dark:text-gray-400">
            No technicians in your team yet.
          </p>
        </div>
      ) : useCarousel ? (
        /* Carousel mode for 5+ technicians */
        <div className="relative">
          <div className="flex items-center justify-center gap-4">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              disabled={isAnimating}
              className="flex-shrink-0 p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous technician"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Technicians Display with Animation */}
            <div
              className="overflow-hidden"
              style={{ width: "calc(4 * (320px + 1rem))" }}
            >
              <div
                className="flex gap-4 transition-all duration-500 ease-out"
                style={{
                  transform: isAnimating
                    ? "translateX(-20px)"
                    : "translateX(0)",
                  opacity: isAnimating ? 0.7 : 1,
                }}
              >
                {getVisibleTechnicians().map((tech, idx) => (
                  <div key={`${tech.id}-${idx}`} className="flex-shrink-0">
                    <TechnicianMetricsCard
                      technician={tech}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="flex-shrink-0 p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next technician"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {techniciansMetrics.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                disabled={isAnimating}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-indigo-500 w-6"
                    : "bg-gray-300 dark:bg-gray-600 w-2 hover:bg-gray-400 dark:hover:bg-gray-500"
                } disabled:cursor-not-allowed`}
                aria-label={`Go to technician ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Centered grid mode for 1-4 technicians */
        <div className="flex justify-center">
          <div
            className={`grid gap-4 ${
              techniciansMetrics.length === 1
                ? "grid-cols-1"
                : techniciansMetrics.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : techniciansMetrics.length === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {techniciansMetrics.map((tech) => (
              <TechnicianMetricsCard
                key={tech.id}
                technician={tech}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      )}
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs">Total Team</p>
              <p className="text-2xl font-bold mt-0.5">
                {techniciansMetrics.length}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs">Available</p>
              <p className="text-2xl font-bold mt-0.5">{availableCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-3 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs">Busy</p>
              <p className="text-2xl font-bold mt-0.5">{busyCount}</p>
            </div>
            <Activity className="w-8 h-8 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-3 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-xs">Overloaded</p>
              <p className="text-2xl font-bold mt-0.5">{overloadedCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
