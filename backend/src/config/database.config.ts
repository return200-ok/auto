import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Vehicle } from '../entities/vehicle.entity';
import { Part } from '../entities/part.entity';
import { PartCategory } from '../entities/part-category.entity';
import { VehiclePartMapping } from '../entities/vehicle-part-mapping.entity';
import { User } from '../entities/user.entity';
import { UserBookmark } from '../entities/user-bookmark.entity';
import { Seller } from '../entities/seller.entity';
import { SellerListing } from '../entities/seller-listing.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST', 'localhost'),
      port: this.configService.get('DB_PORT', 5432),
      username: this.configService.get('DB_USERNAME', 'postgres'),
      password: this.configService.get('DB_PASSWORD', 'postgres'),
      database: this.configService.get('DB_DATABASE', 'auto_parts'),
      entities: [
        Vehicle,
        Part,
        PartCategory,
        VehiclePartMapping,
        User,
        UserBookmark,
        Seller,
        SellerListing,
      ],
      synchronize: this.configService.get('NODE_ENV') === 'development', // Chỉ dùng trong dev
      logging: this.configService.get('NODE_ENV') === 'development',
    };
  }
}

