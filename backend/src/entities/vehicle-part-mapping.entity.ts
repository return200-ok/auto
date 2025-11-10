import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Part } from './part.entity';

@Entity('vehicle_part_mappings')
@Unique(['vehicle_id', 'part_id'])
@Index(['vehicle_id'])
@Index(['part_id'])
export class VehiclePartMapping {
  @PrimaryGeneratedColumn()
  mapping_id: number;

  @Column({ type: 'int' })
  vehicle_id: number;

  @Column({ type: 'int' })
  part_id: number;

  @Column({ type: 'text', nullable: true })
  fitment_notes: string; // Ghi chú (vd: "Chỉ dùng cho động cơ 2.0L")

  @Column({ type: 'boolean', default: false })
  verified: boolean; // Đã được duyệt chưa

  @Column({ type: 'int', nullable: true })
  verified_by: number; // User ID người duyệt

  @Column({ type: 'timestamp', nullable: true })
  verified_at: Date;

  @Column({ type: 'int', nullable: true })
  created_by: number; // User ID người tạo

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.part_mappings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => Part, (part) => part.vehicle_mappings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'part_id' })
  part: Part;
}

