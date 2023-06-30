import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default: true})
    state: boolean;

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

    @Column({default : ""})
    orders: string

}