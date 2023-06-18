import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sellers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @Column({nullable: true})
  products?: Array<string>;

}