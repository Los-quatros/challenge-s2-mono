import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    product_id: string;

    @Column()
    quantity: number;

    @Column({default : null})
    orderId: string;
    
    @Column()
    is_returned: boolean;
}