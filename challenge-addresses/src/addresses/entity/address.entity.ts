import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    state: string;

    @Column()
    zip: number

    @Column()
    country: string

    @Column()
    user_id: string

    @Column()
    city: string

    @Column()
    street: string

    @Column()
    orders: string[]

}