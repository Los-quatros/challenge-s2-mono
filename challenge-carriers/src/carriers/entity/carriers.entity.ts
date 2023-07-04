import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Carriers {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    fees: number

}