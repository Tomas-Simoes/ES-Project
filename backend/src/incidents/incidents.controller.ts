import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { AssignTechniciansDto, CreateIncidentDto, UpdateIncidentDto } from '../common/dto';

@Controller('api/incidents')
export class IncidentsController {
  constructor(private readonly service: IncidentsService) {}

  @Get()
  findAll(@Query() q: any) {
    return this.service.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateIncidentDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateIncidentDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/status')
  setStatus(@Param('id') id: string, @Body() dto: { status: string }) {
    return this.service.setStatus(id, dto.status);
  }

  @Post(':id/assign')
  assign(@Param('id') id: string, @Body() dto: AssignTechniciansDto) {
    return this.service.assignTechnicians(id, dto.technicianIds);
  }

  @Post(':id/unassign')
  unassignTechnician(
    @Param('id') incidentId: string,
    @Body('technicianId') technicianId: string,
  ) {
    return this.incidentsService.unassignOne(incidentId, technicianId);
  }
}
