// src/context/AuthContext.tsx
import { createContext, useContext } from "react";

export type Role = "admin" | "technician" | "manager" | "viewer";

interface AuthContextType {
  role: Role;
}

const AuthContext = createContext<AuthContextType>({ role: "viewer" });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const role: Role = "admin";

  return (
    <AuthContext.Provider value={{ role }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
