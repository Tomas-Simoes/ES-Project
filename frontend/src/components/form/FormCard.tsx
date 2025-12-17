export const FormCard = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`bg-slate-900/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 ${className}`}
  >
    {children}
  </div>
);
