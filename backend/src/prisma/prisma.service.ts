import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private pool: Pool;

  constructor(private config: ConfigService) {
    const url = config.get<string>('DATABASE_URL');

    if (!url || typeof url !== 'string') {
      throw new Error(`DATABASE_URL missing/invalid. Got: ${String(url)}`);
    }

    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);

    super({ adapter } as any);
    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on("beforeExit", async () => {
      await app.close();
      await this.pool.end();
    });
  }
}