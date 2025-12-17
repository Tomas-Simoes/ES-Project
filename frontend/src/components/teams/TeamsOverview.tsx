// src/components/teams/TeamsOverview.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TeamMetricsCard from "./TeamMetricsCard";
import TeamForm from "./TeamForm";
import { mockTechnicians } from "../../mocks/technicans";
import { mockTeamLeaders } from "../../mocks/users";
import type { TeamWithMetrics } from "../../types/team";

export default function TeamsOverview({
  teamsMetrics,
}: {
  teamsMetrics: TeamWithMetrics[];
}) {
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
  };

  // Lógica de exibição baseada na nova interface
  const useCarousel = teamsMetrics.length >= 5;

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
        <div className="relative">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={goToPrevious}
              disabled={isAnimating}
              className="flex-shrink-0 p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

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
                {getVisibleTeams().map((teamData, idx) => (
                  <div
                    key={`${teamData.team.id}-${idx}`}
                    className="flex-shrink-0"
                  >
                    {/* Passamos o objeto inteiro que contém .team e .totals */}
                    <TeamMetricsCard
                      team={teamData}
                      onAssign={() => handleAssignTeam(teamData.team.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="flex-shrink-0 p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {teamsMetrics.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-indigo-500 w-6"
                    : "bg-gray-300 dark:bg-gray-600 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div
            className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${teamsMetrics.length}`}
          >
            {teamsMetrics.map((teamData) => (
              <TeamMetricsCard
                key={teamData.team.id}
                team={teamData}
                onAssign={() => handleAssignTeam(teamData.team.id)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
