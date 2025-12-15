export function statusToDb(s: string) {
  const v = s.trim().toLowerCase();
  if (v === 'in progress' || v === 'in_progress') return 'IN_PROGRESS';
  if (v === 'open') return 'OPEN';
  if (v === 'resolved') return 'RESOLVED';
  return s;
}

export function statusToFrontend(s: string) {
  if (s === 'IN_PROGRESS') return 'In Progress';
  if (s === 'OPEN') return 'Open';
  if (s === 'RESOLVED') return 'Resolved';
  return s;
}

export function priorityToDb(p: string) {
  const v = p.trim().toLowerCase();
  if (v === 'high') return 'HIGH';
  if (v === 'medium') return 'MEDIUM';
  if (v === 'low') return 'LOW';
  if (v === 'critical') return 'CRITICAL';
  return p;
}

export function priorityToFrontend(p: string) {
  if (p === 'HIGH') return 'High';
  if (p === 'MEDIUM') return 'Medium';
  if (p === 'LOW') return 'Low';
  if (p === 'CRITICAL') return 'Critical';
  return p;
}
