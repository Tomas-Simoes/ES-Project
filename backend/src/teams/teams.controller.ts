import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { AddRemoveTechnicianDto, SetTeamLeaderDto, TeamUpsertDto, CreateIncidentDto} from '../common/dto';
import { TechniciansService } from '../technicians/technicians.service';
import { IncidentsService } from '../incidents/incidents.service';

@Controller('api/teams')
export class TeamsController {
  constructor(
    private readonly service: TeamsService,
    private readonly techniciansService: TechniciansService,
    private readonly incidentsService: IncidentsService
  ) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  create(@Body() dto: TeamUpsertDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: TeamUpsertDto) {
    return this.service.update(id, dto);
  }

  @Put(':id/leader')
  setLeader(@Param('id') id: string, @Body() dto: SetTeamLeaderDto) {
    return this.service.setLeader(id, dto.leaderId);
  }

  @Put(':id/technicians/add')
  addTech(@Param('id') id: string, @Body() dto: AddRemoveTechnicianDto) {
    return this.service.addTechnician(id, dto.technicianId);
  }

  @Put(':id/technicians/remove')
  removeTech(@Param('id') id: string, @Body() dto: AddRemoveTechnicianDto) {
    return this.service.removeTechnician(id, dto.technicianId);
  }

  @Get(':id/technicians')
  technicians(@Param('id') id: string) {
    return this.service.listTechnicians(id);
  }

  @Get('by-user/:userId')
  getByUser(@Param('userId') userId: string) {
    return this.teamsService.getTeamByUserId(userId);
  }

  @Get(':id/incidents')
  incidents(@Param('id') id: string, @Query() q: any) {
    return this.service.listIncidents(id, q);
  }


  @Post(':teamId/incidents')
  createIncidentForTeam(
    @Param('teamId') teamId: string,
    @Body() dto: CreateIncidentDto,
  ) {
    return this.incidentsService.createForTeam(teamId, dto);
  }

  @Post(':teamId/incidents/:incidentId')
  addIncidentToTeam(
    @Param('teamId') teamId: string,
    @Param('incidentId') incidentId: string,
  ) {
    return this.incidentsService.addIncidentToTeam(teamId, incidentId);
  }
  

  @Get(':teamId/metrics')
  metricsForTeam(@Param('teamId') teamId: string, @Query() q: any) {
    return this.techniciansService.metricsForTeam(teamId, q);
  }
}
