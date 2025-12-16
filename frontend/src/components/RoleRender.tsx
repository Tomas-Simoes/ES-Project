import React from "react";
import { useAuth } from "../context/AuthContext";

interface RoleRenderProps {
  allowedRoles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleRender({
  allowedRoles,
  children,
  fallback = null,
}: RoleRenderProps) {
  const { me, loading } = useAuth();

  if (loading) return null; 
  if (!me) return <>{fallback}</>;

  return allowedRoles.includes(me.role)
    ? <>{children}</>
    : <>{fallback}</>;
}
