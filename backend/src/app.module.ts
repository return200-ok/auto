import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config/database.config';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { PartModule } from './modules/part/part.module';
import { PartCategoryModule } from './modules/part-category/part-category.module';
import { VehiclePartMappingModule } from './modules/vehicle-part-mapping/vehicle-part-mapping.module';
import { UserModule } from './modules/user/user.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    VehicleModule,
    PartModule,
    PartCategoryModule,
    VehiclePartMappingModule,
    UserModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

