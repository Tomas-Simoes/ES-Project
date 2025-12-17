import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Landing";
import Incidents from "./pages/MyIncident";
import Reports from "./pages/Reports";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import MyIncidents from "./pages/MyTeam";
import Manager from "./pages/Manager";
import Monitoring from "./pages/Monitoring";
import Admin from "./pages/Admin";

import HomeRedirect from "./pages/HomeRedirect";
import RequireAuth from "./routes/RequireAuth";
import MyTeam from "./pages/MyTeam";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Topbar />

        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/manager-dashboard" element={<Manager />} />

            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/my-incidents" element={<MyIncidents />} />
              <Route path="/my-team" element={<MyTeam />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/server-monitoring" element={<Monitoring />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
