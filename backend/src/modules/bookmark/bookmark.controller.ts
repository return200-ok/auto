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
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(@Body() createDto: CreateBookmarkDto) {
    return this.bookmarkService.create(createDto);
  }

  @Get()
  findAll(@Query('userId', ParseIntPipe) userId: number) {
    return this.bookmarkService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.remove(id);
  }

  @Delete()
  removeByUserAndPart(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('partId', ParseIntPipe) partId: number,
    @Query('vehicleId') vehicleId?: string,
  ) {
    return this.bookmarkService.removeByUserAndPart(
      userId,
      partId,
      vehicleId ? parseInt(vehicleId) : undefined,
    );
  }
}

