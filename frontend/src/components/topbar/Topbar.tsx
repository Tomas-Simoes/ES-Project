import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import type { NavLinkRenderProps } from "react-router-dom";
import { RoleRender } from "../RoleRender";
import { LogOut } from "lucide-react";
import Logo from "../../assets/logo.png";

const linkClass = ({ isActive }: NavLinkRenderProps) =>
  `
  relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out
  ${
    isActive
      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
      : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
  }
  before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:bg-indigo-600 dark:before:bg-indigo-400
  before:transform before:scale-x-0 before:transition-transform before:duration-300
  ${isActive ? "before:scale-x-100" : "hover:before:scale-x-100"}
  `;

function Topbar() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-1xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          {/* Logo placeholder - replace with <img src="/your-logo.png" alt="Logo" className="w-9 h-9" /> */}
          <img src={Logo} alt="Logo" className="w-24 h-24" />{" "}
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            IncidentFlow
          </h1>
        </div>

        {/* Navigation - CENTER */}
        <nav className="flex items-center gap-1">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>

          <RoleRender allowedRoles={["technician"]}>
            <NavLink to="/my-incidents" className={linkClass}>
              My Incidents
            </NavLink>
          </RoleRender>

          <RoleRender allowedRoles={["admin", "team-leader"]}>
            <NavLink to="/incidents" className={linkClass}>
              My Team
            </NavLink>
          </RoleRender>

          <RoleRender allowedRoles={["admin", "manager"]}>
            <NavLink to="/manager-dashboard" className={linkClass}>
              Manager Dashboard
            </NavLink>
          </RoleRender>

          <RoleRender allowedRoles={["admin", "manager"]}>
            <NavLink to="/reports" className={linkClass}>
              Reports
            </NavLink>
          </RoleRender>

          <NavLink to="/server-monitoring" className={linkClass}>
            Server Monitoring
          </NavLink>

          <RoleRender allowedRoles={["admin"]}>
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          </RoleRender>
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/logout"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
