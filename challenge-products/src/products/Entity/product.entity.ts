import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Image } from '../models/Image';
import { Category } from './category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    label: string;
    @Column()
    description: string;
    @Column('decimal', {default : 0})
    price: number;
    @Column()
    quantity: number;
    @ManyToOne(() => Category)
    @JoinColumn()
    category?: Category
    @Column({nullable : true})
    sellerId?: string;
    @Column({ default : true})
    isActivated : boolean;
    image? : any;
}
