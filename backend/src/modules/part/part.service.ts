import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from '../../entities/part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Injectable()
export class PartService {
  constructor(
    @InjectRepository(Part)
    private partRepository: Repository<Part>,
  ) {}

  async create(createDto: CreatePartDto): Promise<Part> {
    const part = this.partRepository.create(createDto);
    return await this.partRepository.save(part);
  }

  async findAll(filters?: {
    categoryId?: number;
    brand?: string;
    oemNumber?: string;
    aftermarketNumber?: string;
  }): Promise<Part[]> {
    const queryBuilder = this.partRepository
      .createQueryBuilder('part')
      .leftJoinAndSelect('part.category', 'category');

    if (filters?.categoryId) {
      queryBuilder.andWhere('part.category_id = :categoryId', {
        categoryId: filters.categoryId,
      });
    }
    if (filters?.brand) {
      queryBuilder.andWhere('part.brand = :brand', { brand: filters.brand });
    }
    if (filters?.oemNumber) {
      queryBuilder.andWhere('part.oem_number = :oemNumber', {
        oemNumber: filters.oemNumber,
      });
    }
    if (filters?.aftermarketNumber) {
      queryBuilder.andWhere('part.aftermarket_number = :aftermarketNumber', {
        aftermarketNumber: filters.aftermarketNumber,
      });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Part> {
    const part = await this.partRepository.findOne({
      where: { part_id: id },
      relations: ['category', 'vehicle_mappings', 'vehicle_mappings.vehicle'],
    });
    if (!part) {
      throw new NotFoundException(`Part with ID ${id} not found`);
    }
    return part;
  }

  async update(id: number, updateDto: UpdatePartDto): Promise<Part> {
    const part = await this.findOne(id);
    Object.assign(part, updateDto);
    return await this.partRepository.save(part);
  }

  async remove(id: number): Promise<void> {
    const part = await this.findOne(id);
    await this.partRepository.remove(part);
  }
}

