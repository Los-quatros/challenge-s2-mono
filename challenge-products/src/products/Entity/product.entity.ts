import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;
  @Column()
  description: string;
  @Column('decimal', { default: 0 })
  price: number;
  @Column()
  quantity: number;
  @ManyToOne(() => Category)
  @JoinColumn()
  category?: Category;
  @Column({ nullable: true })
  sellerId?: string;
  @Column({ default: true })
  isActivated: boolean;
  image?: any;
}
