/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
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
import { residencyHistory } from '../residencies/residencyHistory';
import { createResidencyDTO } from '../residencies/createResidency.dto';
import { updateBirdHouseDto } from './updateBirdHouse.dto';

@Injectable()
export class BirdHousesService {
  constructor(
    @InjectRepository(BirdHouse)
    private readonly birdHouseRepository: Repository<BirdHouse>,
    @InjectRepository(residencyHistory)
    private readonly residenceRepository: Repository<residencyHistory>,
  ) {}
  async addBirdHouse(bhDTO: createBirdHouseDto[] | createBirdHouseDto): Promise<BirdHouse | BirdHouse[]> {
    const birdhouses = []
    if (Array.isArray(bhDTO)){
    for (let index = 0; index < bhDTO.length; index++) {
      const element = bhDTO[index];
      const newBirdHouse = this.birdHouseRepository.create({
        ...element,
        birds: 0,
        eggs: 0,
        lastModifiedAt: this.getDate(),
        createdAt: this.getDate(),
      });
      const birdhouse = await this.birdHouseRepository.save(newBirdHouse)
      //console.log(this.birdHouseRepository.getId(newBirdHouse))
      birdhouses.push(birdhouse);
    }} else {
      const newBirdHouse = this.birdHouseRepository.create({
        ...bhDTO,
        birds: 0,
        eggs: 0,
        lastModifiedAt: this.getDate(),
        createdAt: this.getDate(),
      });

      return this.birdHouseRepository.save(newBirdHouse)
    }
    return birdhouses
  }
  async selectAll(page: number = 1): Promise<BirdHouse[]> {
    //http://localhost:3000/house?page=2
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
      .createQueryBuilder('bh')
      .getCount();

    return count;
  }

  async updateResidency(crDTO: createResidencyDTO, ubid: string) {
    await this.birdHouseRepository.update(
      { ubid: ubid },
      { birds: crDTO.birds, eggs: crDTO.eggs, lastModifiedAt: this.getDate() },
    );

    return this.birdHouseRepository.findOne({ where: { ubid } });
  }

  async getBirdHouse(headers: string, ubid: string): Promise<BirdHouse>{
    if (headers === ubid){
      return this.birdHouseRepository.findOne({ where: { ubid } });
    } else {
      throw new HttpException('Invalid X-UBID header or UBID param was provided', HttpStatus.FORBIDDEN);
    }
  }

  async updateBirdHouse(headers: string, ubid: string, uBHDTO: updateBirdHouseDto){
    if (headers === ubid){
      await this.birdHouseRepository.update(
        { ubid: ubid },
        { name: uBHDTO.name, latitude: uBHDTO.latitude, longitude: uBHDTO.longitude },
      );

      return this.birdHouseRepository.findOne({ where: { ubid } });
    } else {
      throw new HttpException('Invalid X-UBID header or UBID param was provided', HttpStatus.FORBIDDEN);
    }
  }

  @Cron('*/10 * * * *')
  async clearUnmodified() {
    console.log('called');
    const dates = this.birdHouseRepository.find({
      select: {
        lastModifiedAt: true,
        ubid: true,
      },
    });
    dates.then((result) => {
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        if (this.differenceYears(this.getDate(), element.lastModifiedAt) >= 1) {
          //delete using the modifiedat as where for history and use ubid to delete birdhouse

          this.birdHouseRepository.delete({ ubid: element.ubid });

          this.residenceRepository.delete({ ubid: element.ubid });
          console.log('done');
        }
        //console.log(fullDate);
        //console.log(element.modifiedAt)
      }
    });
  }

  differenceYears(date1: string, date2: string): number {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    let diff = (dt1.getTime() - dt2.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.round(diff / 365.25));
  }

  getDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const fullDate = year + '-0' + month + '-' + day;
    return fullDate;
  }
}
