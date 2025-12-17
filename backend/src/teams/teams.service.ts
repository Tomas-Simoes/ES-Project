import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TeamUpsertDto } from '../common/dto';
import { priorityToDb, priorityToFrontend, statusToFrontend } from '../common/mappers';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.team.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        leaderId: true,
      },
    });
  }

  async getTeamByUserId(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, teamId: true },
  });

  if (!user) throw new Error('USER_NOT_FOUND');
  if (!user.teamId) return null; // user sem equipa

  const team = await this.prisma.team.findUnique({
    where: { id: user.teamId },
    select: {
      id: true,
      name: true,
      leaderId: true,
      leader: { select: { id: true, name: true, email: true } },
      technicians: { select: { id: true, name: true, email: true, teamId: true, role: true } },
    },
  });

  if (!team) throw new Error('TEAM_NOT_FOUND');

  return {
    ...team,
    technicians: team.technicians.map(t => ({ ...t, role: 'technician' })),
  };
  }

  async get(id: string) {
    const team = await this.prisma.team.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        leaderId: true,
        leader: { select: { id: true, name: true, email: true } },
        technicians: { select: { id: true, name: true, email: true, teamId: true, role: true } },
      },
    });
    if (!team) throw new Error('NOT_FOUND');

    return {
      ...team,
      technicians: team.technicians.map(t => ({ ...t, role: 'technician' })),
    };
  }

  async create(dto: TeamUpsertDto) {
    return this.prisma.team.create({
      data: { name: dto.name },
      select: { id: true, name: true, leaderId: true },
    });
  }

  async update(id: string, dto: TeamUpsertDto) {
    return this.prisma.team.update({
      where: { id },
      data: { name: dto.name },
      select: { id: true, name: true, leaderId: true },
    });
  }

  async setLeader(teamId: string, leaderId: string) {
    // (ideal) validar que leader existe
    const leader = await this.prisma.user.findUnique({ where: { id: leaderId }, select: { id: true } });
    if (!leader) throw new Error('LEADER_NOT_FOUND');

    return this.prisma.team.update({
      where: { id: teamId },
      data: { leaderId },
      select: { id: true, name: true, leaderId: true },
    });
  }

  async addTechnician(teamId: string, technicianId: string) {
    const tech = await this.prisma.user.findUnique({
      where: { id: technicianId },
      select: { id: true, role: true, teamId: true },
    });
    if (!tech) throw new Error('TECH_NOT_FOUND');
    if (tech.role !== 'TECHNICIAN') throw new Error('NOT_A_TECHNICIAN');
    if (tech.teamId && tech.teamId !== teamId) throw new Error('TECH_ALREADY_IN_ANOTHER_TEAM');

    await this.prisma.user.update({
      where: { id: technicianId },
      data: { teamId },
    });

    return { ok: true };
  }

  async removeTechnician(teamId: string, technicianId: string) {
    const tech = await this.prisma.user.findUnique({
      where: { id: technicianId },
      select: { id: true, teamId: true },
    });
    if (!tech) throw new Error('TECH_NOT_FOUND');
    if (tech.teamId !== teamId) throw new Error('TECH_NOT_IN_THIS_TEAM');

    await this.prisma.user.update({
      where: { id: technicianId },
      data: { teamId: null },
    });

    // opcional: também remover assignments de incidents dessa team

    return { ok: true };
  }

  async listTechnicians(teamId: string) {
    const techs = await this.prisma.user.findMany({
      where: { role: 'TECHNICIAN', teamId },
      select: { id: true, name: true, email: true, teamId: true },
      orderBy: { name: 'asc' },
    });

    return techs.map(t => ({ ...t, role: 'technician' }));
  }

  async listIncidents(teamId: string, q: any) {
    const where: any = { teamId };

    if (q.status) where.status = q.status;
    if (q.priority) where.priority = priorityToDb(q.priority);

    if (q.search) {
      where.OR = [
        { title: { contains: q.search, mode: 'insensitive' } },
        { description: { contains: q.search, mode: 'insensitive' } },
      ];
    }

    const incs = await this.prisma.incident.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, title: true, description: true, status: true, priority: true,
        createdAt: true, ownerId: true, teamId: true,
        owner: { select: { id: true, name: true, email: true } },
        team: { select: { id: true, name: true, leaderId: true } },
      },
    });

    return incs.map(i => ({
      ...i,
      status: statusToFrontend(i.status),
      priority: priorityToFrontend(i.priority),
    }));
  }
}
