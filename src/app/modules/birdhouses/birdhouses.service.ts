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
import { createBirdHouseDto } from './createBirdHouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { createResidencyDTO } from './createResidency.dto';

@Injectable()
export class BirdHousesService {
  constructor(
    @InjectRepository(BirdHouse)
    private readonly birdHouseRepository: Repository<BirdHouse>,
  ) {}
  async addBirdHouse(bhDTO: createBirdHouseDto): Promise<BirdHouse> {
    const newBirdHouse = this.birdHouseRepository.create({ ...bhDTO });
    return this.birdHouseRepository.save(newBirdHouse);
  }
  async selectAll(page: number = 1): Promise<BirdHouse[]> { //http://localhost:3000/house?page=2
    return this.birdHouseRepository.find({
      select: {
        ubid: true,
        name: true,
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
}

//     async addFavorite(favDTO: CreateFavoriteDto): Promise<Favorite> {
//       const id = favDTO.user;
//       const user = await this.userRepository.findOne({ where: { id } });
//       if (!user) {
//         throw new NotFoundException('User Not Found');
//       }
//       const newFavorite = new Favorite();
//       newFavorite.user = user;
//       newFavorite.pokemonID = favDTO.pokemonID;
//       newFavorite.pokemonName = favDTO.pokemonName;
//       return this.favoriteRepository.save(newFavorite);
//     }

//     async deleteFavorite(id: number) {
//       const result = await this.favoriteRepository.delete({ id });

//       if (result.affected === 0) {
//         return new HttpException('User not found', HttpStatus.NOT_FOUND);
//       }

//       return result;
//     }

//     findAll(id: number): Promise<Favorite[]> {
//       return this.favoriteRepository.find({
//         relations: {
//           user: true,
//         },
//         where: {
//           user: {
//             id: id,
//           },
//         },
//       });
//     }

//     getUsersFavorites(id: number, pokemonid: number): Promise<Favorite[]>{
//       return this.favoriteRepository.find({
//         relations: {
//           user: true,
//         },
//         where: {
//           user: {
//             id: id,
//           },
//           pokemonID: pokemonid,
//         },
//       });
//     }
