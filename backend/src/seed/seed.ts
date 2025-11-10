import { DataSource } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { Part } from '../entities/part.entity';
import { PartCategory } from '../entities/part-category.entity';
import { VehiclePartMapping } from '../entities/vehicle-part-mapping.entity';
import { User } from '../entities/user.entity';
import { UserBookmark } from '../entities/user-bookmark.entity';
import { Seller } from '../entities/seller.entity';
import { SellerListing } from '../entities/seller-listing.entity';
import { seedDatabase } from './seed-data';

async function runSeed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'auto_parts',
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
    synchronize: true, // Tự động tạo schema trong development
    logging: false,
  });

  try {
    await dataSource.initialize();
    console.log('📦 Connected to database');
    console.log('🔄 Creating database schema...');

    // Schema sẽ được tạo tự động bởi synchronize: true
    await dataSource.synchronize();
    console.log('✅ Database schema created');

    await seedDatabase(dataSource);

    await dataSource.destroy();
    console.log('✅ Seed completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

runSeed();

