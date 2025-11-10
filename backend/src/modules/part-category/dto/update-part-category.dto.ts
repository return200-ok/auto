import { PartialType } from '@nestjs/mapped-types';
import { CreatePartCategoryDto } from './create-part-category.dto';

export class UpdatePartCategoryDto extends PartialType(CreatePartCategoryDto) {}

