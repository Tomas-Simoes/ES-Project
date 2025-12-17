import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TechniciansModule } from '../technicians/technicians.module';

@Module({
  controllers: [TeamsController],
  imports: [TechniciansModule],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
