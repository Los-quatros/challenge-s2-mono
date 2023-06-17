import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderProduct } from './orderProduct.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    total: number;

    @Column()
    is_delivered: boolean;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
    orderProducts: Array<OrderProduct>;
    
    @Column()
    sellerId: string;
}