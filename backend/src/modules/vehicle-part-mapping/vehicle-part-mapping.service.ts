import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiclePartMapping } from '../../entities/vehicle-part-mapping.entity';
import { CreateVehiclePartMappingDto } from './dto/create-vehicle-part-mapping.dto';
import { UpdateVehiclePartMappingDto } from './dto/update-vehicle-part-mapping.dto';
import { VehicleService } from '../vehicle/vehicle.service';
import { PartService } from '../part/part.service';

@Injectable()
export class VehiclePartMappingService {
  constructor(
    @InjectRepository(VehiclePartMapping)
    private mappingRepository: Repository<VehiclePartMapping>,
    private vehicleService: VehicleService,
    private partService: PartService,
  ) {}

  async create(createDto: CreateVehiclePartMappingDto): Promise<VehiclePartMapping> {
    // Verify vehicle and part exist
    await this.vehicleService.findOne(createDto.vehicle_id);
    await this.partService.findOne(createDto.part_id);

    // Check if mapping already exists
    const existing = await this.mappingRepository.findOne({
      where: {
        vehicle_id: createDto.vehicle_id,
        part_id: createDto.part_id,
      },
    });

    if (existing) {
      throw new BadRequestException(
        'Mapping between this vehicle and part already exists',
      );
    }

    const mapping = this.mappingRepository.create(createDto);
    return await this.mappingRepository.save(mapping);
  }

  async findAll(filters?: {
    vehicleId?: number;
    partId?: number;
    verified?: boolean;
  }): Promise<VehiclePartMapping[]> {
    const queryBuilder = this.mappingRepository
      .createQueryBuilder('mapping')
      .leftJoinAndSelect('mapping.vehicle', 'vehicle')
      .leftJoinAndSelect('mapping.part', 'part');

    if (filters?.vehicleId) {
      queryBuilder.andWhere('mapping.vehicle_id = :vehicleId', {
        vehicleId: filters.vehicleId,
      });
    }
    if (filters?.partId) {
      queryBuilder.andWhere('mapping.part_id = :partId', {
        partId: filters.partId,
      });
    }
    if (filters?.verified !== undefined) {
      queryBuilder.andWhere('mapping.verified = :verified', {
        verified: filters.verified,
      });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<VehiclePartMapping> {
    const mapping = await this.mappingRepository.findOne({
      where: { mapping_id: id },
      relations: ['vehicle', 'part'],
    });
    if (!mapping) {
      throw new NotFoundException(`Mapping with ID ${id} not found`);
    }
    return mapping;
  }

  async update(
    id: number,
    updateDto: UpdateVehiclePartMappingDto,
  ): Promise<VehiclePartMapping> {
    const mapping = await this.findOne(id);
    Object.assign(mapping, updateDto);
    return await this.mappingRepository.save(mapping);
  }

  async verify(id: number, verifiedBy: number): Promise<VehiclePartMapping> {
    const mapping = await this.findOne(id);
    mapping.verified = true;
    mapping.verified_by = verifiedBy;
    mapping.verified_at = new Date();
    return await this.mappingRepository.save(mapping);
  }

  async remove(id: number): Promise<void> {
    const mapping = await this.findOne(id);
    await this.mappingRepository.remove(mapping);
  }

  // Get parts for a specific vehicle
  async getPartsByVehicle(vehicleId: number): Promise<VehiclePartMapping[]> {
    return await this.findAll({ vehicleId, verified: true });
  }

  // Get vehicles for a specific part
  async getVehiclesByPart(partId: number): Promise<VehiclePartMapping[]> {
    return await this.findAll({ partId, verified: true });
  }
}

