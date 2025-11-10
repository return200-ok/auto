import { IsString, IsInt, IsOptional, IsObject } from 'class-validator';

export class CreatePartDto {
  @IsInt()
  category_id: number;

  @IsString()
  @IsOptional()
  oem_number?: string;

  @IsString()
  @IsOptional()
  aftermarket_number?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  @IsOptional()
  specs?: Record<string, any>;

  @IsString()
  @IsOptional()
  image_url?: string;
}

