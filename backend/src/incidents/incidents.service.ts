import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { IncidentPriority, IncidentStatus } from '@prisma/client';

type ListQuery = {
  status?: IncidentStatus;
  priority?: IncidentPriority;
  ownerId?: string;
  search?: string;
  page?: number;
  limit?: number;
};

@Injectable()
export class IncidentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ListQuery) {
    const page = Math.max(Number(query.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(query.limit ?? 20), 1), 100);
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.status) where.status = query.status;
    if (query.priority) where.priority = query.priority;
    if (query.ownerId) where.ownerId = query.ownerId;

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.incident.findMany({
        where,
        include: { owner: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.incident.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total },
    };
  }

  create(dto: CreateIncidentDto) {
    return this.prisma.incident.create({
      data: {
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        status: dto.status ?? 'OPEN',
        ownerId: dto.ownerId ?? null,
      },
      include: { owner: { select: { id: true, name: true } } },
    });
  }

  update(id: string, dto: UpdateIncidentDto) {
    return this.prisma.incident.update({
      where: { id },
      data: dto,
      include: { owner: { select: { id: true, name: true } } },
    });
  }

  remove(id: string) {
    return this.prisma.incident.delete({ where: { id } });
  }
}
