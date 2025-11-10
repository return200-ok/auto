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
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  findAll(
    @Query('make') make?: string,
    @Query('model') model?: string,
    @Query('year') year?: string,
  ) {
    return this.vehicleService.findAll({
      make,
      model,
      year: year ? parseInt(year) : undefined,
    });
  }

  @Get('makes')
  getMakes() {
    return this.vehicleService.getMakes();
  }

  @Get('models')
  getModels(@Query('make') make: string) {
    return this.vehicleService.getModels(make);
  }

  @Get('years')
  getYears(@Query('make') make: string, @Query('model') model: string) {
    return this.vehicleService.getYears(make, model);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.remove(id);
  }
}

