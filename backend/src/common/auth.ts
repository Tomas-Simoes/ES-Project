export type CurrentUser = { id: string; role: 'TECHNICIAN' | 'MANAGER' | 'ADMIN' };

export function assertManager(u?: CurrentUser) {
  if (!u || (u.role !== 'MANAGER' && u.role !== 'ADMIN')) {
    throw new Error('FORBIDDEN_MANAGER_ONLY');
  }
}

export function assertTeamLeaderOrManager(isLeader: boolean, u?: CurrentUser) {
  if (!u) throw new Error('UNAUTHORIZED');
  if (u.role === 'MANAGER' || u.role === 'ADMIN') return;
  if (!isLeader) throw new Error('FORBIDDEN_TEAM_LEADER_ONLY');
}
