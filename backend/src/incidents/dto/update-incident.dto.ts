import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { IncidentPriority, IncidentStatus } from '@prisma/client';

export class UpdateIncidentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(IncidentPriority)
  @IsOptional()
  priority?: IncidentPriority;

  @IsEnum(IncidentStatus)
  @IsOptional()
  status?: IncidentStatus;

  @IsUUID()
  @IsOptional()
  ownerId?: string | null;
}
