import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Incident Manager</h1>
        <nav className="space-x-4">
          <a href="#log" className="hover:underline">Log Incident</a>
          <a href="#reports" className="hover:underline">Reports</a>
        </nav>
      </header>

      {/* Main content with sidebar */}
      <div className="flex flex-1">
        <aside className="w-64 bg-blue-50 p-4">
          {/* Sidebar links */}
          <ul className="space-y-2">
            <li><a href="#dashboard" className="block text-blue-700 hover:underline">Dashboard</a></li>
            <li><a href="#incidents" className="block text-blue-700 hover:underline">Incidents</a></li>
          </ul>
        </aside>

        <main className="flex-1 p-6">
          {/* Example main content placeholder */}
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p>Welcome to the Incident Management System. Use the menu to navigate.</p>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-2">
        © 2025 MyCompany
      </footer>
    </div>
  );
}

export default App;
