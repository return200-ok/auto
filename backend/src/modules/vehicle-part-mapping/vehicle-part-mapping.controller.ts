import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { VehiclePartMappingService } from './vehicle-part-mapping.service';
import { CreateVehiclePartMappingDto } from './dto/create-vehicle-part-mapping.dto';
import { UpdateVehiclePartMappingDto } from './dto/update-vehicle-part-mapping.dto';

@Controller('vehicle-part-mappings')
export class VehiclePartMappingController {
  constructor(private readonly mappingService: VehiclePartMappingService) {}

  @Post()
  create(@Body() createDto: CreateVehiclePartMappingDto) {
    return this.mappingService.create(createDto);
  }

  @Get()
  findAll(
    @Query('vehicleId') vehicleId?: string,
    @Query('partId') partId?: string,
    @Query('verified') verified?: string,
  ) {
    return this.mappingService.findAll({
      vehicleId: vehicleId ? parseInt(vehicleId) : undefined,
      partId: partId ? parseInt(partId) : undefined,
      verified: verified === 'true' ? true : verified === 'false' ? false : undefined,
    });
  }

  @Get('vehicle/:vehicleId/parts')
  getPartsByVehicle(@Param('vehicleId', ParseIntPipe) vehicleId: number) {
    return this.mappingService.getPartsByVehicle(vehicleId);
  }

  @Get('part/:partId/vehicles')
  getVehiclesByPart(@Param('partId', ParseIntPipe) partId: number) {
    return this.mappingService.getVehiclesByPart(partId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mappingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateVehiclePartMappingDto,
  ) {
    return this.mappingService.update(id, updateDto);
  }

  @Patch(':id/verify')
  verify(
    @Param('id', ParseIntPipe) id: number,
    @Body('verifiedBy', ParseIntPipe) verifiedBy: number,
  ) {
    return this.mappingService.verify(id, verifiedBy);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mappingService.remove(id);
  }
}

