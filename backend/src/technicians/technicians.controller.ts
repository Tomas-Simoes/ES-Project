import { Controller, Get, Param, Query } from '@nestjs/common';
import { TechniciansService } from './technicians.service';

@Controller('api/technician')
export class TechniciansController {
  constructor(private readonly service: TechniciansService) {}

  @Get()
  list(@Query() q: any) {
    return this.service.list(q);
  }

  @Get('metrics')
  metrics(@Query() q: any) {
    return this.service.metrics(q);
  }

  @Get(':id/incidents')
  incidents(@Param('id') id: string, @Query() q: any) {
    return this.service.incidentsForTechnician(id, q);
  }
}
