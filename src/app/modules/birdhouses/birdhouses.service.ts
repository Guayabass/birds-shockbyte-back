/* eslint-disable prettier/prettier */
import {
  //HttpException,
  //HttpStatus,
  Injectable,
  //Inject
  //NotFoundException,
} from '@nestjs/common';
//import { InjectRepository } from '@nestjs/typeorm';
import { BirdHouse } from './BirdHouse';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { createBirdHouseDto } from './createBirdHouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { residencyHistory } from '../residencies/residencyHistory'
import { createResidencyDTO } from '../residencies/createResidency.dto';

@Injectable()
export class BirdHousesService {
  constructor(
    @InjectRepository(BirdHouse)
    private readonly birdHouseRepository: Repository<BirdHouse>,
    @InjectRepository(residencyHistory)
    private readonly residenceRepository: Repository<residencyHistory>,
  ) {}
  async addBirdHouse(bhDTO: createBirdHouseDto): Promise<BirdHouse> {
    const newBirdHouse = this.birdHouseRepository.create({ ...bhDTO, birds: 0, eggs: 0 });
    return this.birdHouseRepository.save(newBirdHouse);
  }
  async selectAll(page: number = 1): Promise<BirdHouse[]> { //http://localhost:3000/house?page=2
    return this.birdHouseRepository.find({
      select: {
        ubid: true,
        name: true,
        longitude: true,
        latitude: true,
        birds: true,
        eggs: true,
      },
      skip: 5 * (page - 1),
      take: 5,
    });
  }
  async getCountAll() {
    const count = await this.birdHouseRepository
    .createQueryBuilder("bh")
    .getCount()

    return count
  }

  async updateResidency(crDTO: createResidencyDTO, ubid: string){
   await this.birdHouseRepository.update({ ubid: ubid }, { birds: crDTO.birds, eggs: crDTO.eggs }) 

   return this.birdHouseRepository.findOne({ where: { ubid } })
  }

  @Cron('45 * * * * *')
  async clearUnmodified() {
    const dates = this.residenceRepository.find({
      select: {
        modifiedAt: true,
        ubid: true,
      }
    })
    dates.then((result) => {
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const fullDate = year + "-0" + month + "-" + day
        if(this.differenceYears(fullDate, element.modifiedAt) >= 1){
          //delete using the modifiedat as where for history and use ubid to delete birdhouse
        } 
        //console.log(fullDate);
        //console.log(element.modifiedAt)
      }
    })
  }

  differenceYears(date1: string, date2: string){
    const dt1 = new Date(date1)
    const dt2 = new Date(date2)
    let diff = (dt1.getTime() - dt2.getTime()) / 1000;
    diff /= (60 * 60 *24)
    return Math.abs(Math.round(diff/365.25))
  }

}
