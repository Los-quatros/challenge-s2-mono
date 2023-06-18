import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true})
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  roles: string;

  @Column({nullable: true})
  activation_token: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  resetPasswordToken: string | null;

  @Column({nullable: true})
  avatar: number;

  @Column({nullable: true})
  sellerId: string;

}