import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartCategory } from '../../entities/part-category.entity';
import { CreatePartCategoryDto } from './dto/create-part-category.dto';
import { UpdatePartCategoryDto } from './dto/update-part-category.dto';

@Injectable()
export class PartCategoryService {
  constructor(
    @InjectRepository(PartCategory)
    private categoryRepository: Repository<PartCategory>,
  ) {}

  async create(createDto: CreatePartCategoryDto): Promise<PartCategory> {
    const category = this.categoryRepository.create(createDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(parentId?: number): Promise<PartCategory[]> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'children');

    if (parentId !== undefined) {
      queryBuilder.where('category.parent_category_id = :parentId', { parentId });
    } else {
      queryBuilder.where('category.parent_category_id IS NULL');
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<PartCategory> {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
      relations: ['parent', 'children', 'parts'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateDto: UpdatePartCategoryDto): Promise<PartCategory> {
    const category = await this.findOne(id);
    Object.assign(category, updateDto);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}

