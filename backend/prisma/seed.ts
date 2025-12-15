import 'dotenv/config';
import { PrismaClient, IncidentPriority, IncidentStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter } as any);


async function main() {
  console.log('🌱 Seeding database...');

  await prisma.incident.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: { name: 'Alice' },
  });

  const bob = await prisma.user.create({
    data: { name: 'Bob' },
  });

  const charlie = await prisma.user.create({
    data: { name: 'Charlie' },
  });

  const diana = await prisma.user.create({
    data: { name: 'Diana' },
  });

  await prisma.incident.createMany({
    data: [
      {
        title: 'Server Down',
        description: 'Server is completely down, needs immediate attention',
        status: IncidentStatus.IN_PROGRESS,
        priority: IncidentPriority.HIGH,
        ownerId: alice.id,
        createdAt: new Date('2025-12-25T09:30:00'),
      },
      {
        title: 'Login Bug',
        description: 'Users cannot log in due to session timeout',
        status: IncidentStatus.RESOLVED,
        priority: IncidentPriority.MEDIUM,
        ownerId: bob.id,
        createdAt: new Date('2025-12-13T09:30:00'),
      },
      {
        title: 'Payment Gateway Error',
        description: 'Payments are failing for some users',
        status: IncidentStatus.OPEN,
        priority: IncidentPriority.HIGH,
        ownerId: charlie.id,
        createdAt: new Date('2025-12-12T14:00:00'),
      },
      {
        title: 'UI Glitch in Dashboard',
        description: 'Dashboard widgets overlap in mobile view',
        status: IncidentStatus.IN_PROGRESS,
        priority: IncidentPriority.LOW,
        ownerId: diana.id,
        createdAt: new Date('2025-12-10T11:15:00'),
      },
      {
        title: 'Email Notifications not sent',
        description: 'System emails are not being delivered',
        status: IncidentStatus.OPEN,
        priority: IncidentPriority.MEDIUM,
        ownerId: alice.id,
        createdAt: new Date('2025-12-09T08:45:00'),
      },
      {
        title: 'Slow API response',
        description: 'API response time is above 5s for some endpoints',
        status: IncidentStatus.IN_PROGRESS,
        priority: IncidentPriority.MEDIUM,
        ownerId: bob.id,
        createdAt: new Date('2025-12-08T13:30:00'),
      },
    ],
  });

  console.log('✅ Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
