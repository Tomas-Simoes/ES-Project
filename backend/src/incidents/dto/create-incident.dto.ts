import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { IncidentPriority, IncidentStatus } from '@prisma/client';

export class CreateIncidentDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(IncidentPriority)
  priority!: IncidentPriority;

  @IsEnum(IncidentStatus)
  @IsOptional()
  status?: IncidentStatus;

  @IsOptional()
  teamId?: string;
  
  @IsOptional()
  ownerId?: string;
}
