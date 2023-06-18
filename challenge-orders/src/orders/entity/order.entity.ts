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

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order)
    orderProducts: Array<OrderProduct>;

    @Column()
    address: string

    @Column()
    carrier: string

    @Column()
    is_paid: boolean

    @Column()
    userId: string;

    getOrderProductIds(): string[] {
        return this.orderProducts.map(orderProduct => orderProduct.id);
    }
}