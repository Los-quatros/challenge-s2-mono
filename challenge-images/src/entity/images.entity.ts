import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  emplacementFile: string;

  @Column({nullable: true})
  userId: string;

  @Column({nullable: true})
  productId: string;

}
