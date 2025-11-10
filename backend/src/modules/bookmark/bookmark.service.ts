import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBookmark } from '../../entities/user-bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(UserBookmark)
    private bookmarkRepository: Repository<UserBookmark>,
  ) {}

  async create(createDto: CreateBookmarkDto): Promise<UserBookmark> {
    const bookmark = this.bookmarkRepository.create(createDto);
    return await this.bookmarkRepository.save(bookmark);
  }

  async findAll(userId: number): Promise<UserBookmark[]> {
    return await this.bookmarkRepository.find({
      where: { user_id: userId },
      relations: ['part', 'part.category', 'vehicle'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<UserBookmark> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { bookmark_id: id },
      relations: ['part', 'part.category', 'vehicle'],
    });
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID ${id} not found`);
    }
    return bookmark;
  }

  async update(id: number, updateDto: UpdateBookmarkDto): Promise<UserBookmark> {
    const bookmark = await this.findOne(id);
    Object.assign(bookmark, updateDto);
    return await this.bookmarkRepository.save(bookmark);
  }

  async remove(id: number): Promise<void> {
    const bookmark = await this.findOne(id);
    await this.bookmarkRepository.remove(bookmark);
  }

  async removeByUserAndPart(
    userId: number,
    partId: number,
    vehicleId?: number,
  ): Promise<void> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: {
        user_id: userId,
        part_id: partId,
        vehicle_id: vehicleId || null,
      },
    });
    if (bookmark) {
      await this.bookmarkRepository.remove(bookmark);
    }
  }
}

