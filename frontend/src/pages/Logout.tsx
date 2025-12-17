import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth";
import { useAuth } from "../context/AuthContext"; 

function Logout() {
  const navigate = useNavigate();
  const { refetch } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        await logoutUser(); // tenta invalidar refresh token no backend
      } catch {
        // mesmo que falhe (token expirado, etc), limpamos localmente
      } finally {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        await refetch(); // atualiza me -> null
        navigate("/login", { replace: true });
      }
    })();
  }, [navigate, refetch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Logged Out
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        You have been logged out successfully.
      </p>
      <Link
        to="/login"
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
}
export default Logout;
