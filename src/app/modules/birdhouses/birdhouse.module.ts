/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BirdHousesService } from './birdhouses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BirdHouse } from './BirdHouse';
import { BirdHouseController } from './birdhouses.controller';
import { residencyHistory } from '../residencies/residencyHistory';

@Module({
  imports: [TypeOrmModule.forFeature([BirdHouse, residencyHistory])],
  controllers: [BirdHouseController],
  providers: [
    {
      provide: 'BIRDHOUSE_SERVICE',
      useClass: BirdHousesService,
    },
  ],
})
export class BirdHouseModule {}
