import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    label: string;
    @Column()
    description: string;
    @Column()
    price: number;
    @Column()
    quantity: number;
    @OneToOne(() => Category)
    @JoinColumn()
    category: Category
    @Column()
    sellerId: string;
}
