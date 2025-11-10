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
import { PartCategoryService } from './part-category.service';
import { CreatePartCategoryDto } from './dto/create-part-category.dto';
import { UpdatePartCategoryDto } from './dto/update-part-category.dto';

@Controller('part-categories')
export class PartCategoryController {
  constructor(private readonly categoryService: PartCategoryService) {}

  @Post()
  create(@Body() createDto: CreatePartCategoryDto) {
    return this.categoryService.create(createDto);
  }

  @Get()
  findAll(@Query('parentId') parentId?: string) {
    return this.categoryService.findAll(
      parentId ? parseInt(parentId) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePartCategoryDto,
  ) {
    return this.categoryService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}

