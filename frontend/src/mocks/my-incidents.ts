// src/mocks/incidents.ts
import type { Incident } from "../types/incident";

export const mockMyIncidents: Incident[] = [
  {
    id: 1,
    title: "Server Down",
    owner: { id: 1, name: "Alice", email: "alice@example.com" },
    description: "Server is completely down, needs immediate attention",
    status: "In Progress",
    priority: "High",
    created_at: new Date("2025-12-25T09:30:00"),
  },
  {
    id: 5,
    title: "Email Notifications not sent",
    owner: { id: 1, name: "Alice", email: "alice@example.com" },
    description: "System emails are not being delivered",
    status: "Open",
    priority: "Medium",
    created_at: new Date("2025-12-09T08:45:00"),
  },
  {
    id: 7,
    title: "Database Performance Issues",
    owner: { id: 1, name: "Alice", email: "alice@example.com" },
    description: "Queries taking longer than expected during peak hours",
    status: "In Progress",
    priority: "High",
    created_at: new Date("2025-12-20T14:20:00"),
  },
  {
    id: 8,
    title: "Mobile App Crash on iOS",
    owner: { id: 1, name: "Alice", email: "alice@example.com" },
    description: "App crashes when user tries to upload images",
    status: "Open",
    priority: "Medium",
    created_at: new Date("2025-12-15T11:30:00"),
  },
  {
    id: 9,
    title: "Security Patch Required",
    owner: { id: 1, name: "Alice", email: "alice@example.com" },
    description: "Critical security vulnerability needs patching",
    status: "Resolved",
    priority: "High",
    created_at: new Date("2025-12-01T08:00:00"),
  },
];
