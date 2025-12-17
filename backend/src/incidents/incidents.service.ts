import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIncidentDto, UpdateIncidentDto } from '../common/dto';
import { priorityToDb, priorityToFrontend, statusToDb, statusToFrontend } from '../common/mappers';

@Injectable()
export class IncidentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(q: any) {
    const where: any = {};

    if (q.teamId) where.teamId = q.teamId;
    if (q.ownerId) where.ownerId = q.ownerId;

    if (q.status) where.status = statusToDb(q.status);
    if (q.priority) where.priority = priorityToDb(q.priority);

    if (q.search) {
      where.OR = [
        { title: { contains: q.search, mode: 'insensitive' } },
        { description: { contains: q.search, mode: 'insensitive' } },
      ];
    }

    if (q.from || q.to) {
      where.createdAt = {};
      if (q.from) where.createdAt.gte = new Date(q.from);
      if (q.to) where.createdAt.lte = new Date(q.to);
    }

    const incidents = await this.prisma.incident.findMany({
      where,
      orderBy: { createdAt: 'desc' },
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
    }); 

    return incidents.map(i => ({
      ...i,
      status: statusToFrontend(i.status),
      priority: priorityToFrontend(i.priority),
    }));
  }

  async findOne(id: string) {
    const inc = await this.prisma.incident.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        team: { select: { id: true, name: true, leaderId: true } },
        assignments: { include: { user: { select: { id: true, name: true, email: true } } } },
      },
    });
    if (!inc) throw new Error('NOT_FOUND');

    return {
      id: inc.id,
      title: inc.title,
      description: inc.description,
      status: statusToFrontend(inc.status),
      priority: priorityToFrontend(inc.priority),
      createdAt: inc.createdAt,
      ownerId: inc.ownerId,
      teamId: inc.teamId,
      owner: inc.owner,
      team: inc.team,
      technicians: inc.assignments.map(a => a.user),
    };
  }

  async create(dto: CreateIncidentDto) {
    const created = await this.prisma.incident.create({
      data: {
        title: dto.title,
        description: dto.description ?? '',
        status: statusToDb(dto.status) as any,
        priority: priorityToDb(dto.priority) as any,
      },
      select: {
        id: true, title: true, description: true, status: true, priority: true,
        createdAt: true, ownerId: true, teamId: true,
        owner: { select: { id: true, name: true, email: true } },
        team: { select: { id: true, name: true, leaderId: true } },
      },
    });

    return {
      ...created,
      status: statusToFrontend(created.status),
      priority: priorityToFrontend(created.priority),
    };
  }

  async update(id: string, dto: UpdateIncidentDto) {
    const data: any = {};
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.status !== undefined) data.status = statusToDb(dto.status);
    if (dto.priority !== undefined) data.priority = priorityToDb(dto.priority);

    const updated = await this.prisma.incident.update({
      where: { id },
      data,
      select: {
        id: true, title: true, description: true, status: true, priority: true,
        createdAt: true, ownerId: true, teamId: true,
        owner: { select: { id: true, name: true, email: true } },
        team: { select: { id: true, name: true, leaderId: true } },
      },
    });

    return {
      ...updated,
      status: statusToFrontend(updated.status),
      priority: priorityToFrontend(updated.priority),
    };
  }

  async setStatus(id: string, statusFrontend: string) {
    const status = statusToDb(statusFrontend);

    const data: any = { status };
    if (status === 'RESOLVED') data.resolvedAt = new Date();
    if (status !== 'RESOLVED') data.resolvedAt = null;

    const updated = await this.prisma.incident.update({
      where: { id },
      data,
      select: { id: true, status: true, resolvedAt: true },
    });

    return {
      ...updated,
      status: statusToFrontend(updated.status),
    };
  }

  async assignTechnicians(incidentId: string, technicianIds: string[]) {
    const incident = await this.prisma.incident.findUnique({
      where: { id: incidentId },
      select: { id: true, teamId: true },
    });
    if (!incident) throw new Error('NOT_FOUND');

    const techs = await this.prisma.user.findMany({
      where: { id: { in: technicianIds }, role: 'TECHNICIAN' },
      select: { id: true, teamId: true },
    });

    for (const t of techs) {
      if (t.teamId !== incident.teamId) {
        throw new Error(`TECH_NOT_IN_INCIDENT_TEAM:${t.id}`);
      }
    }

    await this.prisma.incidentAssignment.createMany({
      data: technicianIds.map((uid) => ({ incidentId, userId: uid })),
      skipDuplicates: true,
    });

    return { ok: true };
  }

  async unassignTechnicians(incidentId: string, technicianIds: string[]) {
    await this.prisma.incidentAssignment.deleteMany({
      where: { incidentId, userId: { in: technicianIds } },
    });
    return { ok: true };
  }

  async unassignOne(incidentId: string, technicianId: string) {
  return this.prisma.incidentAssignment.delete({
    where: {
      incidentId_userId: {
        incidentId,
        userId: technicianId,
      },
    },
  });
}
}
