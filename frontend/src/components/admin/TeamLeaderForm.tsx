import { FormButton } from "../form/FormButton";
import { FormHeader } from "../form/FormHeader";
import { Plus, Shield } from "lucide-react";
import { useState } from "react";
import type { User } from "../../types/user";
import type { TeamDTO } from "../../types/team";
import type { CreateTeamLeaderForm } from "../../types/create";

export const TeamLeaderForm = ({
  onSubmit,
  onCancel,
  users,
  teams, // Nova prop adicionada
}: {
  onSubmit: (data: CreateTeamLeaderForm) => void;
  onCancel: () => void;
  users: User[];
  teams: TeamDTO[];
}) => {
  const [formData, setFormData] = useState<CreateTeamLeaderForm>({
    technicianId: "",
    teamId: "",
  });

  const handleSubmit = () => {
    if (!formData.technicianId || !formData.teamId) {
      alert("Please select both a Technician and a Team.");
      return;
    }
    // Envia o objeto completo
    onSubmit(formData);
  };

  // Função auxiliar para atualizar o formData
  const updateFormData = (field: keyof CreateTeamLeaderForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectClasses = `
    mt-1 block w-full px-3 py-2 text-base 
    border border-gray-300 rounded-lg shadow-sm
    bg-white text-gray-900 
    focus:outline-none focus:ring-green-500 focus:border-green-500
    dark:border-gray-600 dark:bg-gray-700 dark:text-white
    dark:focus:ring-green-400 dark:focus:border-green-400
    sm:text-sm appearance-none cursor-pointer
  `;

  return (
    <div className="space-y-4">
      <FormHeader
        icon={Shield}
        title="Promote Technician to Team Leader"
        color="green"
        onClose={onCancel}
      />

      {/* 1. Dropdown para Selecionar o Técnico (Leader) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Select Technician to Promote
        </label>
        <select
          value={formData.technicianId}
          onChange={(e) => updateFormData("technicianId", e.target.value)}
          className={selectClasses}
        >
          <option value="">-- Select a technician --</option>
          {users.map((technician) => (
            <option key={technician.id} value={technician.id}>
              {technician.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Dropdown para Selecionar a Equipe */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Assign to Team
        </label>
        <select
          value={formData.teamId}
          onChange={(e) => updateFormData("teamId", e.target.value)}
          className={selectClasses}
        >
          <option value="">-- Select a team --</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <FormButton onClick={handleSubmit} variant="primary" icon={Plus}>
          Promote to Leader
        </FormButton>
        <FormButton variant="secondary" onClick={onCancel}>
          Cancel
        </FormButton>
      </div>
    </div>
  );
};
