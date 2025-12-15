import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';

@Controller('incidents')
export class IncidentsController {
  constructor(private incidentsService: IncidentsService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.incidentsService.findAll(query);
  }

  @Post()
  create(@Body() dto: CreateIncidentDto) {
    return this.incidentsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateIncidentDto) {
    return this.incidentsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentsService.remove(id);
  }
}
