import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    product_id: string;

    @Column()
    quantity: number;

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order;
    
    @Column()
    is_returned: boolean;
}