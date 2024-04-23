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

    @Column("decimal", { precision: 8, scale: 4 } )
    longitude: number;

    @Column("decimal", { precision: 8, scale: 4 } )
    latitude: number;

    @Column()
    birds: number;

    @Column()
    eggs: number;

    @Column({type: 'date'})
    lastModifiedAt: string;

    @Column({type: 'date'})
    createdAt: string;

    //https://typeorm.io/entities#special-columns

  }
  