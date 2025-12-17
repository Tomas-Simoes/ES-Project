import React, { useState } from "react";
import { Zap } from "lucide-react";
import { IncidentForm } from "../components/admin/IncidentForm";
import { useCreate } from "../hooks/create/useCreate";
import type { CreateIncidentForm } from "../types/create";
import { FormCard } from "../components/form/FormCard";
import { TeamLeaderForm } from "../components/admin/TeamLeaderForm";
import { TeamForm } from "../components/admin/TeamForm";
function LandingPage() {
  const { incident } = useCreate();
  const handleCreateIncident = async (data: CreateIncidentForm) => {
    console.log("Creating incident:", data);
    const success = await incident.createIncident(data);
    if (success) alert("Incident created successfully!" + success);
  };
  const handle = () => {};
  const activeForm: string = "incident";

  return (
    <div className="text-slate-100 p-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Resolve incidents 3x faster</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Incident Management
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              Made Simple
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track, manage, and resolve incidents with ease. Empower your team
            with the tools they need to maintain uptime and deliver exceptional
            service.
          </p>
        </div>
        <FormCard className="max-w-2xl mx-auto">
          {activeForm === "incident" && (
            <IncidentForm onSubmit={handleCreateIncident} onCancel={handle} />
          )}
          {activeForm === "leader" && (
            <TeamLeaderForm
              onSubmit={handle}
              onCancel={handle}
              technicians={[]}
              teams={[]}
            />
          )}
          {activeForm === "team" && (
            <TeamForm onSubmit={handle} onCancel={handle} technicians={[]} />
          )}
        </FormCard>
      </section>
    </div>
  );
}

export default LandingPage;
