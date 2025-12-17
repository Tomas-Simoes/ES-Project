import { Module } from '@nestjs/common';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';
import { EmailService  } from 'src/email/email.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [IncidentsController],
  imports: [PrismaModule],
  providers: [IncidentsService, EmailService],
  exports: [IncidentsService]
})
export class IncidentsModule {}
