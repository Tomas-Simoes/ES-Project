import { FormInput } from "../form/FormInput";
import { FormTextArea } from "../form/FormTextArea";
import { FormButton } from "../form/FormButton";
import { FormHeader } from "../form/FormHeader";
import { Plus, UsersRound } from "lucide-react";
import type { CreateTeamForm } from "../../types/create";
import { useState } from "react";
import type { Technician } from "../../types/user";

export const TeamForm = ({
  onSubmit,
  onCancel,
  technicians,
}: {
  onSubmit: (data: CreateTeamForm) => void;
  onCancel: () => void;
  technicians: Technician[]; // Lista simples de técnicos
}) => {
  const [formData, setFormData] = useState<CreateTeamForm>({
    name: "",
    description: "",
    leaderId: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.description) {
      alert("Please fill in all required fields (Name and Description)");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <FormHeader
        icon={UsersRound}
        title="Create New Team"
        color="purple"
        onClose={onCancel}
      />

      {/* FormInput and FormTextArea (assumindo que já suportam dark mode internamente) */}
      <FormInput
        label="Team Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Backend Team"
        required
      />

      <FormTextArea
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Brief description of team responsibilities..."
        required
      />

      {/* Novo Dropdown para Team Leader (Estilo Moderno e Dark Mode) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Team Leader
        </label>
        <select
          value={formData.leaderId}
          onChange={(e) =>
            setFormData({ ...formData, leaderId: e.target.value })
          }
          className="
            mt-1 block w-full px-3 py-2 text-base 
            border border-gray-300 rounded-lg shadow-sm
            bg-white text-gray-900 
            focus:outline-none focus:ring-purple-500 focus:border-purple-500
            dark:border-gray-600 dark:bg-gray-700 dark:text-white
            dark:focus:ring-purple-400 dark:focus:border-purple-400
            sm:text-sm appearance-none cursor-pointer
          "
        >
          <option value="">-- Leave empty to assign later --</option>
          {technicians.map((technician) => (
            <option key={technician.id} value={technician.id}>
              {technician.name}
            </option>
          ))}
        </select>
        {/* Você pode adicionar um ícone de seta ou chevron aqui se não quiser depender de 'appearance-none' */}
      </div>
      {/* Fim do Dropdown Moderno */}

      <div className="flex gap-3 pt-4">
        <FormButton onClick={handleSubmit} variant="primary" icon={Plus}>
          Create Team
        </FormButton>
      </div>
    </div>
  );
};
