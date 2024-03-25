/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BirdHousesService } from './birdhouses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BirdHouse } from './BirdHouse';
import { BirdHouseController } from './birdhouses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BirdHouse])],
  controllers: [BirdHouseController],
  providers: [
    {
      provide: 'BIRDHOUSE_SERVICE',
      useClass: BirdHousesService,
    },
  ],
})
export class BirdHouseModule {}
