// src/context/AuthContext.tsx
import { createContext, useContext } from "react";

export type Role =
  | "admin"
  | "manager"
  | "team-leader"
  | "technician"
  | "viewer";

interface AuthContextType {
  role: Role;
}

// MANAGER : ASSIGN TEAMS
// TEAM-LEADER : ASSIGN INCIDENTS TO TECHNICIANS
// TECHNICIAN : RESOLVE INCIDENTS

const AuthContext = createContext<AuthContextType>({ role: "viewer" });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const role: Role = "admin"; // TODO: Replace with real auth logic

  return (
    <AuthContext.Provider value={{ role }}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
