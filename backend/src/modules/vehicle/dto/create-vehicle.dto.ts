import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsString()
  @IsOptional()
  trim?: string;

  @IsString()
  @IsOptional()
  engine_code?: string;
}

