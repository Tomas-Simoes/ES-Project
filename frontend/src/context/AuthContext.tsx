import { createContext, useContext } from "react";
import { useMe, type Me } from "../hooks/auth/useMe";

interface AuthContextType {
  me: Me | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { me, loading, refetch } = useMe();

  return (
    <AuthContext.Provider value={{ me, loading, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
