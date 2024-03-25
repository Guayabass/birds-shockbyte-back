/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  @Entity()
  export class BirdHouse {
    @PrimaryGeneratedColumn("uuid")
    ubid: string;
  
    @Column()
    name: string;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @Column()
    birds: number;

    @Column()
    eggs: number;

    //https://typeorm.io/entities#special-columns

  }
  