import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { PartCategory } from './part-category.entity';
import { VehiclePartMapping } from './vehicle-part-mapping.entity';

@Entity('parts')
@Index(['oem_number'])
@Index(['aftermarket_number'])
export class Part {
  @PrimaryGeneratedColumn()
  part_id: number;

  @Column({ type: 'int' })
  category_id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  oem_number: string; // Mã OEM

  @Column({ type: 'varchar', length: 100, nullable: true })
  aftermarket_number: string; // Mã aftermarket

  @Column({ type: 'varchar', length: 100, nullable: true })
  brand: string; // Thương hiệu (Denso, Bosch, ...)

  @Column({ type: 'varchar', length: 255 })
  name: string; // Tên phụ tùng

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  specs: Record<string, any>; // Thông số kỹ thuật (JSON)

  @Column({ type: 'varchar', length: 500, nullable: true })
  image_url: string; // URL hình ảnh

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => PartCategory, (category) => category.parts)
  @JoinColumn({ name: 'category_id' })
  category: PartCategory;

  @OneToMany(() => VehiclePartMapping, (mapping) => mapping.part)
  vehicle_mappings: VehiclePartMapping[];
}

