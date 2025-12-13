import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Reports from "./pages/Reports";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import MyIncidents from "./pages/MyIncidents";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Topbar />
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/my-incidents" element={<MyIncidents />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
