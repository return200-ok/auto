import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreatePartCategoryDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  parent_category_id?: number;

  @IsString()
  @IsOptional()
  description?: string;
}

