import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Seller } from './seller.entity';
import { Part } from './part.entity';

@Entity('seller_listings')
export class SellerListing {
  @PrimaryGeneratedColumn()
  listing_id: number;

  @Column({ type: 'int' })
  seller_id: number;

  @Column({ type: 'int' })
  part_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'varchar', length: 20, default: 'new' })
  status: string; // 'new' hoặc 'used'

  @Column({ type: 'text', nullable: true })
  condition_description: string;

  @Column({ type: 'int', nullable: true })
  stock_quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Seller, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;

  @ManyToOne(() => Part, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'part_id' })
  part: Part;
}

