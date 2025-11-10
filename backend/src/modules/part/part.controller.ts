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
import { PartService } from './part.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Controller('parts')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Post()
  create(@Body() createDto: CreatePartDto) {
    return this.partService.create(createDto);
  }

  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('brand') brand?: string,
    @Query('oemNumber') oemNumber?: string,
    @Query('aftermarketNumber') aftermarketNumber?: string,
  ) {
    return this.partService.findAll({
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      brand,
      oemNumber,
      aftermarketNumber,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePartDto,
  ) {
    return this.partService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partService.remove(id);
  }
}

