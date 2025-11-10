import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateBookmarkDto {
  @IsInt()
  user_id: number;

  @IsInt()
  part_id: number;

  @IsInt()
  @IsOptional()
  vehicle_id?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

