/* eslint-disable prettier/prettier */
//hacer un entity que guarde la fecha de cambio, los nuevos huevos y pajaros
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class residencyHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ubid: string;

  @Column()
  updatedBirds: number;

  @Column()
  updatedEggs: number;

  @Column({type: 'date'})
  modifiedAt: string;
}
