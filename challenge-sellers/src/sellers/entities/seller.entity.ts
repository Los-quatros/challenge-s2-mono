import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sellers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isEnabled: boolean;

  @Column()
  sellerCode: string;

}