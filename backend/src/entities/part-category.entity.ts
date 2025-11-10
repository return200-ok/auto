import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Part } from './part.entity';

@Entity('part_categories')
export class PartCategory {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string; // Tên danh mục

  @Column({ type: 'int', nullable: true })
  parent_category_id: number; // FK cho danh mục cha

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => PartCategory, (category) => category.children)
  @JoinColumn({ name: 'parent_category_id' })
  parent: PartCategory;

  @OneToMany(() => PartCategory, (category) => category.parent)
  children: PartCategory[];

  @OneToMany(() => Part, (part) => part.category)
  parts: Part[];
}

