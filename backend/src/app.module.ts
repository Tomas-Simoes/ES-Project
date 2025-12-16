import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { IncidentsModule } from './incidents/incidents.module';
import { TechniciansModule } from './technicians/technicians.module';
import { TeamsModule } from './teams/teams.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, IncidentsModule, TechniciansModule, TeamsModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
