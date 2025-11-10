import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclePartMapping } from '../../entities/vehicle-part-mapping.entity';
import { VehiclePartMappingController } from './vehicle-part-mapping.controller';
import { VehiclePartMappingService } from './vehicle-part-mapping.service';
import { VehicleModule } from '../vehicle/vehicle.module';
import { PartModule } from '../part/part.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehiclePartMapping]),
    VehicleModule,
    PartModule,
  ],
  controllers: [VehiclePartMappingController],
  providers: [VehiclePartMappingService],
  exports: [VehiclePartMappingService],
})
export class VehiclePartMappingModule {}

