import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Part } from './part.entity';
import { Vehicle } from './vehicle.entity';

@Entity('user_bookmarks')
@Unique(['user_id', 'part_id', 'vehicle_id'])
@Index(['user_id'])
export class UserBookmark {
  @PrimaryGeneratedColumn()
  bookmark_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  part_id: number;

  @Column({ type: 'int', nullable: true })
  vehicle_id: number; // Xe mà user đang quan tâm

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Part, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'part_id' })
  part: Part;

  @ManyToOne(() => Vehicle, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}

