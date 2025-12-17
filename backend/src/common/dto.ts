import { IsArray, IsEmail, IsEnum, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateIncidentDto {
  @IsString() @MinLength(2) title!: string;
  @IsOptional() @IsString() description?: string;

  @IsString() priority!: string;
  @IsString() status!: string;

  @IsUUID() @IsOptional() teamId!: string;
  @IsUUID() @IsOptional() ownerId!: string;
}

export class UpdateIncidentDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() priority?: string;
  @IsOptional() @IsString() status?: string;
}

export class AssignTechniciansDto {
  @IsArray() @IsUUID('4', { each: true }) technicianIds!: string[];
}

export class SetTeamLeaderDto {
  @IsUUID() leaderId!: string;
}

export class TeamUpsertDto {
  @IsString() @MinLength(2) name!: string;
}

export class AddRemoveTechnicianDto {
  @IsUUID() technicianId!: string;
}
