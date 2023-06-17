import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
    @Column()
    sellerId: string;
}
