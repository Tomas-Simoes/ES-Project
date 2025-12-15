import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { IncidentsModule } from './incidents/incidents.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, IncidentsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
