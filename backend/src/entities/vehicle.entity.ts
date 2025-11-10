import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { VehiclePartMapping } from './vehicle-part-mapping.entity';

@Entity('vehicles')
@Index(['make', 'model'])
@Index(['year'])
export class Vehicle {
  @PrimaryGeneratedColumn()
  vehicle_id: number;

  @Column({ type: 'varchar', length: 100 })
  make: string; // Hãng (Toyota, Honda, ...)

  @Column({ type: 'varchar', length: 100 })
  model: string; // Dòng (Camry, Civic, ...)

  @Column({ type: 'int' })
  year: number; // Năm sản xuất

  @Column({ type: 'varchar', length: 100, nullable: true })
  trim: string; // Phiên bản (2.5Q, EX, ...)

  @Column({ type: 'varchar', length: 50, nullable: true })
  engine_code: string; // Mã động cơ

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => VehiclePartMapping, (mapping) => mapping.vehicle)
  part_mappings: VehiclePartMapping[];
}

