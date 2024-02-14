import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ninja {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
