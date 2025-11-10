import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartCategory } from '../../entities/part-category.entity';
import { PartCategoryController } from './part-category.controller';
import { PartCategoryService } from './part-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([PartCategory])],
  controllers: [PartCategoryController],
  providers: [PartCategoryService],
  exports: [PartCategoryService],
})
export class PartCategoryModule {}

