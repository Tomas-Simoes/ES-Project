// src/components/teams/TeamsOverview.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TeamMetricsCard from "./TeamMetricsCard";
import TeamForm from "./TeamForm";
import { mockTechnicians, mockTeamLeaders } from "../../mocks/users";

const teamsMetrics = [
  {
    id: "team-1",
    name: "Infrastructure Team",
    category: "Infrastructure",
    totalTechs: 5,
    availableTechs: 2,
    busyTechs: 3,
    openIncidents: 4,
    inProgressIncidents: 6,
    resolvedToday: 3,
    avgResolutionTime: "2.5h",
    workloadPercentage: 75,
    responseTime: "15 min",
  },
  {
    id: "team-2",
    name: "Database Operations",
    category: "Database",
    totalTechs: 4,
    availableTechs: 3,
    busyTechs: 1,
    openIncidents: 2,
    inProgressIncidents: 3,
    resolvedToday: 5,
    avgResolutionTime: "1.8h",
    workloadPercentage: 45,
    responseTime: "10 min",
  },
  {
    id: "team-3",
    name: "Security Team",
    category: "Security",
    totalTechs: 6,
    availableTechs: 1,
    busyTechs: 5,
    openIncidents: 8,
    inProgressIncidents: 4,
    resolvedToday: 2,
    avgResolutionTime: "3.2h",
    workloadPercentage: 90,
    responseTime: "25 min",
  },
  {
    id: "team-4",
    name: "Service Desk",
    category: "Support",
    totalTechs: 8,
    availableTechs: 5,
    busyTechs: 3,
    openIncidents: 5,
    inProgressIncidents: 7,
    resolvedToday: 12,
    avgResolutionTime: "1.2h",
    workloadPercentage: 60,
    responseTime: "5 min",
  },
  {
    id: "team-5",
    name: "Network Operations",
    category: "Network",
    totalTechs: 4,
    availableTechs: 2,
    busyTechs: 2,
    openIncidents: 3,
    inProgressIncidents: 4,
    resolvedToday: 4,
    avgResolutionTime: "2.0h",
    workloadPercentage: 55,
    responseTime: "12 min",
  },
];

export default function TeamsOverview() {
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCreateTeam = (data: {
    name: string;
    category: string;
    leaderId: string;
    technicianIds: string[];
  }) => {
    console.log("Create team:", data);
    setShowForm(false);
  };

  const handleAssignTeam = (teamId: string) => {
    console.log("Assign to team:", teamId);
    // Here you would handle the assignment logic
  };

  const useCarousel = teamsMetrics.length >= 5;

  // Carousel navigation with animation
  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === 0 ? teamsMetrics.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === teamsMetrics.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Get visible teams for carousel (show 4 at a time)
  const getVisibleTeams = () => {
    if (teamsMetrics.length <= 4) return teamsMetrics;

    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % teamsMetrics.length;
      visible.push(teamsMetrics[index]);
    }
    return visible;
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-l font-semibold text-gray-900 dark:text-gray-100">
            Teams Overview
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Analyze team capacity and performance metrics
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowForm((v) => !v)}
            className="py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-md hover:shadow-lg transition"
          >
            New Team
          </button>
          {showForm && (
            <TeamForm
              technicians={mockTechnicians}
              leaders={mockTeamLeaders}
              onCreate={handleCreateTeam}
              onClose={() => setShowForm(false)}
            />
          )}
        </div>
      </div>

      {/* Teams Container */}
      {teamsMetrics.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-gray-500 dark:text-gray-400">
            No teams yet. Create your first team!
          </p>
        </div>
      ) : useCarousel ? (
        /* Carousel mode for 5+ teams */
        <div className="relative">
          <div className="flex items-center justify-center gap-4">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              disabled={isAnimating}
              className="flex-shrink-0 p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous team"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Teams Display with Animation */}
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
                {getVisibleTeams().map((team, idx) => (
                  <div key={`${team.id}-${idx}`} className="flex-shrink-0">
                    <TeamMetricsCard team={team} onAssign={handleAssignTeam} />
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="flex-shrink-0 p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next team"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {teamsMetrics.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                disabled={isAnimating}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-indigo-500 w-6"
                    : "bg-gray-300 dark:bg-gray-600 w-2 hover:bg-gray-400 dark:hover:bg-gray-500"
                } disabled:cursor-not-allowed`}
                aria-label={`Go to team ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Centered grid mode for 1-4 teams */
        <div className="flex justify-center">
          <div
            className={`grid gap-4 ${
              teamsMetrics.length === 1
                ? "grid-cols-1"
                : teamsMetrics.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : teamsMetrics.length === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {teamsMetrics.map((team) => (
              <TeamMetricsCard
                key={team.id}
                team={team}
                onAssign={handleAssignTeam}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
