import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiclePartMappingDto } from './create-vehicle-part-mapping.dto';

export class UpdateVehiclePartMappingDto extends PartialType(
  CreateVehiclePartMappingDto,
) {}

