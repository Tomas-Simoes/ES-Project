import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { priorityToDb, priorityToFrontend, statusToFrontend } from '../common/mappers';

@Injectable()
export class TechniciansService {
  constructor(private prisma: PrismaService) {}

  async list(q: any) {
    const where: any = { role: 'TECHNICIAN' };

    if (q.teamId) where.teamId = q.teamId;
    if (q.search) {
      where.OR = [
        { name: { contains: q.search, mode: 'insensitive' } },
        { email: { contains: q.search, mode: 'insensitive' } },
      ];
    }

    const techs = await this.prisma.user.findMany({
      where,
      select: { id: true, name: true, email: true, teamId: true },
      orderBy: { name: 'asc' },
    });

    return techs.map(t => ({ ...t, role: 'technician' }));
  }

  async incidentsForTechnician(technicianId: string, q: any) {
    const whereIncident: any = {};
    if (q.status) whereIncident.status = q.status; // assume enum already
    if (q.priority) whereIncident.priority = priorityToDb(q.priority);

    const rows = await this.prisma.incidentAssignment.findMany({
      where: { userId: technicianId },
      select: {
        incident: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            createdAt: true,
            ownerId: true,
            teamId: true,
            owner: { select: { id: true, name: true, email: true } },
            team: { select: { id: true, name: true, leaderId: true } },
          },
        },
      },
    });

    const incidents = rows.map(r => r.incident).filter(Boolean);

    return incidents.map(i => ({
      ...i,
      status: statusToFrontend(i.status),
      priority: priorityToFrontend(i.priority),
    }));
  }

  async metrics(q: any) {
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const whereUser: any = { role: 'TECHNICIAN' };
    if (q.teamId) whereUser.teamId = q.teamId;

    const techs = await this.prisma.user.findMany({
      where: whereUser,
      select: {
        id: true,
        name: true,
        email: true,
        teamId: true,
        team: { select: { id: true, name: true, leaderId: true } },
        incidentAssignments: {
          select: {
            incident: {
              select: {
                status: true,
                priority: true,
                createdAt: true,
                resolvedAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return techs.map((t) => {
      const incidents = t.incidentAssignments.map(a => a.incident);

      const totalIncidents = incidents.length;
      const openIncidents = incidents.filter(i => i.status === 'OPEN').length;
      const inProgressIncidents = incidents.filter(i => i.status === 'IN_PROGRESS').length;

      const resolvedToday = incidents.filter(
        i => i.status === 'RESOLVED' && i.resolvedAt && i.resolvedAt >= startOfToday,
      ).length;

      const highPriorityCount = incidents.filter(
        i => i.priority === 'HIGH',
      ).length;

      const avgResolutionTime = avgResolutionTimeStr(incidents);

      const workloadScore = (inProgressIncidents * 2) + highPriorityCount;
      const workloadPercentage = Math.min(100, Math.round((workloadScore / Math.max(1, totalIncidents)) * 100));

      console.log("Mail " + t.email);

      return {
        id: t.id,
        name: t.name,
        email: t.email,
        status: inProgressIncidents > 0 ? 'busy' : 'available',
        totalIncidents,
        openIncidents,
        inProgressIncidents,
        resolvedToday,
        avgResolutionTime,
        workloadPercentage,
        highPriorityCount,
        teamId: t.teamId,
        team: t.team,
      };
    });
  }
}

function avgResolutionTimeStr(incidents: any[]) {
  const resolved = incidents.filter(i => i.resolvedAt);
  if (!resolved.length) return '0h';

  const totalMs = resolved.reduce((acc, i) => acc + (new Date(i.resolvedAt).getTime() - new Date(i.createdAt).getTime()), 0);
  const hours = totalMs / resolved.length / 1000 / 60 / 60;
  return `${hours.toFixed(1)}h`;
}

function lastActivityStr(incidents: any[]) {
  if (!incidents.length) return 'No activity';
  const last = incidents.reduce((latest, i) => {
    const d = new Date(i.updatedAt ?? i.createdAt);
    return d > latest ? d : latest;
  }, new Date(0));

  const diffMin = Math.floor((Date.now() - last.getTime()) / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffH = Math.floor(diffMin / 60);
  return `${diffH}h ago`;
}
