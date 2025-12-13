// src/mocks/incidents.ts
import type { Incident } from "../types/incident";
import type { Technician } from "../types/technician";

export const mockTechnicians: Technician[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
  { id: 4, name: "Diana", email: "diana@example.com" },
];

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Server Down",
    owner: mockTechnicians[0],
    description: "Server is completely down, needs immediate attention",
    status: "In Progress",
    priority: "High",
    created_at: new Date("2025-12-25T09:30:00"),
  },
  {
    id: 2,
    title: "Login Bug",
    owner: mockTechnicians[1],
    description: "Users cannot log in due to session timeout",
    status: "Resolved",
    priority: "Medium",
    created_at: new Date("2025-12-13T09:30:00"),
  },
  {
    id: 3,
    title: "Payment Gateway Error",
    owner: mockTechnicians[2],
    description: "Payments are failing for some users",
    status: "Open",
    priority: "High",
    created_at: new Date("2025-12-12T14:00:00"),
  },
  {
    id: 4,
    title: "UI Glitch in Dashboard",
    owner: mockTechnicians[3],
    description: "Dashboard widgets overlap in mobile view",
    status: "In Progress",
    priority: "Low",
    created_at: new Date("2025-12-10T11:15:00"),
  },
  {
    id: 5,
    title: "Email Notifications not sent",
    owner: mockTechnicians[0],
    description: "System emails are not being delivered",
    status: "Open",
    priority: "Medium",
    created_at: new Date("2025-12-09T08:45:00"),
  },
  {
    id: 6,
    title: "Slow API response",
    owner: mockTechnicians[1],
    description: "API response time is above 5s for some endpoints",
    status: "In Progress",
    priority: "Medium",
    created_at: new Date("2025-12-08T13:30:00"),
  },
];
