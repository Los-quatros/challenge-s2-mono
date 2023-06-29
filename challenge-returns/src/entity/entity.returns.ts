import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Returns {
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column()
    total : number;

    @Column()
    reason : string;

    @Column({default : null})
    orderProducts : string

    // pending validated refused
    @Column({ default : "pending"})
    status : string;

    @Column()
    userId : string;

    getOrderProductIds(): string[] {
        return this.orderProducts.split(';');
    }
}
