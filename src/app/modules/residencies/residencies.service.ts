/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  //Inject
  //NotFoundException,
} from '@nestjs/common';
//import { InjectRepository } from '@nestjs/typeorm';
import { residencyHistory } from './residencyHistory';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class residenceService {
  constructor(
    @InjectRepository(residencyHistory)
    private readonly residenceRepository: Repository<residencyHistory>,
  ) {}

  async getHistory(ubid: string, page: number = 1): Promise<residencyHistory[]> {
    const count = await this.residenceRepository
    .createQueryBuilder("history")
    .where("history.ubid = :ubid", {ubid: ubid})
    .getCount()
    console.log(count)
    // console.log(ubid)

    if (count >= 1){
      return this.residenceRepository.find({
        select: {
          updatedBirds: true,
          updatedEggs: true,
          modifiedAt: true,
        },
        where: {
          ubid: ubid,
        },
        skip: 5 * (page - 1),
        take: 5,
      });
    }
    else {
      throw new HttpException('Invalid X-UBID or it has not been updated', HttpStatus.FORBIDDEN);
    }
  }

  async getCountAll(ubid: string) {
    const count = await this.residenceRepository
    .createQueryBuilder("history")
    .where("history.ubid = :ubid", {ubid: ubid})
    .getCount()

    return count
  }
//http://localhost:3000/house?page=2
}
