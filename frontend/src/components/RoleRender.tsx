import { useAuth } from "../context/AuthContext";
import type { Role } from "../context/AuthContext";

interface RoleRenderProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleRender({
  allowedRoles,
  children,
  fallback = null,
}: RoleRenderProps) {
  const { role } = useAuth();
  return allowedRoles.includes(role) ? <>{children}</> : <>{fallback}</>;
}
