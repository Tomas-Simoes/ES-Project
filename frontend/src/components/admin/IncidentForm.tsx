import { FormInput } from "../form/FormInput";
import { FormTextArea } from "../form/FormTextArea";
import { FormSelect } from "../form/FormSelect";
import { FormButton } from "../form/FormButton";
import { FormHeader } from "../form/FormHeader";
import { AlertCircle, Plus } from "lucide-react";
import type { CreateIncidentForm } from "../../types/create";
import { useState } from "react";

export const IncidentForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: CreateIncidentForm) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<CreateIncidentForm>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
    teamId: "",
    ownerId: "",
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <FormHeader
        icon={AlertCircle}
        title="Create New Incident"
        color="red"
        onClose={onCancel}
      />

      <FormInput
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Brief description of the incident"
        required
      />

      <FormTextArea
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Detailed description of what happened..."
        required
      />

      <div className="space-y-4">
        <FormSelect
          label="Priority"
          value={formData.priority}
          onChange={(e) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setFormData({ ...formData, priority: e.target.value as any })
          }
          options={[
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
            { value: "Critical", label: "Critical" },
          ]}
          required
        />

        <FormSelect
          label="Status"
          value={formData.status}
          onChange={(e) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setFormData({ ...formData, status: e.target.value as any })
          }
          options={[
            { value: "Open", label: "Open" },
            { value: "In Progress", label: "In Progress" },
            { value: "Resolved", label: "Resolved" },
            { value: "Closed", label: "Closed" },
          ]}
          required
        />
      </div>

      <FormInput
        label="Team ID (Optional)"
        value={formData.teamId || ""}
        onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
        placeholder="Leave empty to assign later"
      />

      <FormInput
        label="Owner ID (Optional)"
        value={formData.ownerId || ""}
        onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
        placeholder="Leave empty to assign later"
      />

      <div className="flex gap-3 pt-4">
        <FormButton onClick={handleSubmit} variant="primary" icon={Plus}>
          Create Incident
        </FormButton>
      </div>
    </div>
  );
};
