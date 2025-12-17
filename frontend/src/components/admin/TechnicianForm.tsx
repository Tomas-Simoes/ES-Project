import { FormInput } from "../form/FormInput";
import { FormButton } from "../form/FormButton";
import { FormHeader } from "../form/FormHeader";
import { Plus, Users } from "lucide-react";

export const TechnicianForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: CreateTechnicianForm) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<CreateTechnicianForm>({
    name: "",
    email: "",
    password: "",
    teamId: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <FormHeader
        icon={Users}
        title="Create New Technician"
        color="blue"
        onClose={onCancel}
      />

      <FormInput
        label="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="John Doe"
        required
      />

      <FormInput
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="john.doe@company.com"
        required
      />

      <FormInput
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Minimum 8 characters"
        required
      />

      <FormInput
        label="Team ID (Optional)"
        value={formData.teamId || ""}
        onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
        placeholder="Leave empty to assign later"
      />

      <div className="flex gap-3 pt-4">
        <FormButton onClick={handleSubmit} variant="primary" icon={Plus}>
          Create Technician
        </FormButton>
        <FormButton variant="secondary" onClick={onCancel}>
          Cancel
        </FormButton>
      </div>
    </div>
  );
};
