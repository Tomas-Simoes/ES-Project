import 'dotenv/config';
import { PrismaClient, IncidentPriority, IncidentStatus, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.incidentAssignment.deleteMany();
  await prisma.incident.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  const manager = await prisma.user.create({
    data: { name: 'Maria Manager', email: 'manager@company.com', role: Role.MANAGER },
  });

  const backendLeader = await prisma.user.create({
    data: { name: 'Bob Leader', email: 'bob.leader@company.com', role: Role.TECHNICIAN },
  });

  const frontendLeader = await prisma.user.create({
    data: { name: 'Alice Leader', email: 'alice.leader@company.com', role: Role.TECHNICIAN },
  });

  const tech1 = await prisma.user.create({
    data: { name: 'Charlie Tech', email: 'charlie@company.com', role: Role.TECHNICIAN },
  });

  const tech2 = await prisma.user.create({
    data: { name: 'Diana Tech', email: 'diana@company.com', role: Role.TECHNICIAN },
  });

  const tech3 = await prisma.user.create({
    data: { name: 'Eve Tech', email: 'eve@company.com', role: Role.TECHNICIAN },
  });

  const backendTeam = await prisma.team.create({
    data: { name: 'Backend Team', leaderId: backendLeader.id },
  });

  const frontendTeam = await prisma.team.create({
    data: { name: 'Frontend Team', leaderId: frontendLeader.id },
  });

  await prisma.user.updateMany({
    where: { id: { in: [backendLeader.id, tech1.id, tech2.id] } },
    data: { teamId: backendTeam.id },
  });

  await prisma.user.updateMany({
    where: { id: { in: [frontendLeader.id, tech3.id] } },
    data: { teamId: frontendTeam.id },
  });

  const incA = await prisma.incident.create({
    data: {
      title: 'Server Down',
      description: 'Production server is down',
      status: IncidentStatus.IN_PROGRESS,
      priority: IncidentPriority.HIGH,
      ownerId: backendLeader.id,
      teamId: backendTeam.id,
      createdAt: new Date('2025-12-25T09:30:00'),
    },
  });

  const incB = await prisma.incident.create({
    data: {
      title: 'Login Bug',
      description: 'Users cannot login',
      status: IncidentStatus.OPEN,
      priority: IncidentPriority.MEDIUM,
      ownerId: tech1.id,
      teamId: backendTeam.id,
      createdAt: new Date('2025-12-24T14:00:00'),
    },
  });

  const incC = await prisma.incident.create({
    data: {
      title: 'Payment Gateway Error',
      description: 'Payments failing',
      status: IncidentStatus.RESOLVED,
      priority: IncidentPriority.HIGH,
      ownerId: tech2.id,
      teamId: backendTeam.id,
      resolvedAt: new Date(),
      createdAt: new Date('2025-12-23T10:15:00'),
    },
  });

  const incD = await prisma.incident.create({
    data: {
      title: 'UI glitch',
      description: 'Mobile layout broken',
      status: IncidentStatus.IN_PROGRESS,
      priority: IncidentPriority.LOW,
      ownerId: frontendLeader.id,
      teamId: frontendTeam.id,
      createdAt: new Date('2025-12-22T11:45:00'),
    },
  });

  await prisma.incidentAssignment.createMany({
    data: [
      { incidentId: incA.id, userId: backendLeader.id },
      { incidentId: incA.id, userId: tech1.id },

      { incidentId: incB.id, userId: tech1.id },

      { incidentId: incC.id, userId: tech2.id },

      { incidentId: incD.id, userId: frontendLeader.id },
      { incidentId: incD.id, userId: tech3.id },
    ],
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
