import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../../entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return await this.vehicleRepository.save(vehicle);
  }

  async findAll(filters?: {
    make?: string;
    model?: string;
    year?: number;
  }): Promise<Vehicle[]> {
    const queryBuilder = this.vehicleRepository.createQueryBuilder('vehicle');

    if (filters?.make) {
      queryBuilder.andWhere('vehicle.make = :make', { make: filters.make });
    }
    if (filters?.model) {
      queryBuilder.andWhere('vehicle.model = :model', { model: filters.model });
    }
    if (filters?.year) {
      queryBuilder.andWhere('vehicle.year = :year', { year: filters.year });
    }

    return await queryBuilder.getMany();
  }

  async getMakes(): Promise<string[]> {
    const result = await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('DISTINCT vehicle.make', 'make')
      .orderBy('vehicle.make', 'ASC')
      .getRawMany();
    return result.map((r) => r.make);
  }

  async getModels(make: string): Promise<string[]> {
    const result = await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('DISTINCT vehicle.model', 'model')
      .where('vehicle.make = :make', { make })
      .orderBy('vehicle.model', 'ASC')
      .getRawMany();
    return result.map((r) => r.model);
  }

  async getYears(make: string, model: string): Promise<number[]> {
    const result = await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .select('DISTINCT vehicle.year', 'year')
      .where('vehicle.make = :make', { make })
      .andWhere('vehicle.model = :model', { model })
      .orderBy('vehicle.year', 'DESC')
      .getRawMany();
    return result.map((r) => r.year);
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { vehicle_id: id },
      relations: ['part_mappings', 'part_mappings.part'],
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    Object.assign(vehicle, updateVehicleDto);
    return await this.vehicleRepository.save(vehicle);
  }

  async remove(id: number): Promise<void> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.remove(vehicle);
  }
}

