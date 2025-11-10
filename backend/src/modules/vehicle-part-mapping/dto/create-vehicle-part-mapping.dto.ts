import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateVehiclePartMappingDto {
  @IsInt()
  vehicle_id: number;

  @IsInt()
  part_id: number;

  @IsString()
  @IsOptional()
  fitment_notes?: string;

  @IsInt()
  @IsOptional()
  created_by?: number;
}

