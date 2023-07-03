import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { OrderProduct } from './orderProduct.entity';
import { Exclude, Expose } from 'class-transformer';
@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', {default : 0})
    total: number;

    @Column({ default : false})
    is_delivered: boolean;

    @Column()
    address: string

    @Column()
    carrier: string

    @Column({default : false})
    is_paid: boolean

    @Column()
    userId: string;

    @Column({default : null})
    orderProducts : string
    
    @CreateDateColumn({nullable : true})
    createdAt: Date;
    
    getOrderProductIds(): string[] {
        return this.orderProducts.split(';');
    }
}