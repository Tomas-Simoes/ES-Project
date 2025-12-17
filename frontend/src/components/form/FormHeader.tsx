import { X } from "lucide-react";

export const FormHeader = ({
  icon: Icon,
  title,
  color,
  onClose,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  color: string;
  onClose: () => void;
}) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-2">
      <Icon className={`w-5 h-5 text-${color}-400`} />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <button onClick={onClose} className="text-slate-400 hover:text-white">
      <X className="w-5 h-5" />
    </button>
  </div>
);
