/* eslint-disable prettier/prettier */
import {
  Body,
  //ClassSerializerInterceptor,
  Controller,
  Get,
 // HttpException,
  //HttpStatus,
  Inject,
  Param,
  //Param,
  //ParseIntPipe,
  Post,
  Query,
  //UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { CreateUserDto } from 'src/app/modules/users-auth/CreateUser.dto';
// import { LoginUser } from 'src/app/modules/users-auth/LoginUser.dto';
// // import { UpdateUserDto } from 'src/users-auth/dto/UpdateUser.dto';
// import { UserNotFoundException } from 'src/core/exceptions/UserNotFound.exception';
import { BirdHousesService } from './birdhouses.service';
import { createBirdHouseDto } from './createBirdHouse.dto';
import { createResidencyDTO } from './createResidency.dto';

@Controller('house')
export class BirdHouseController {
  constructor(
    @Inject('BIRDHOUSE_SERVICE') private readonly birdHouseService: BirdHousesService,
  ) {}

  @Post('')
  @UsePipes(ValidationPipe)
  createUser(@Body() bhDTO: createBirdHouseDto) {
    return this.birdHouseService.addBirdHouse(bhDTO);
  }

  @Get('')
  showAll(@Query('page') page: number){
    return this.birdHouseService.selectAll(page)
  }

  @Get('count')
  showCount(){
    return this.birdHouseService.getCountAll()
  }

  @Post(':id/residency')
  @UsePipes(ValidationPipe)
  createResidency(@Body() crDTO: createResidencyDTO, @Param('id') ubid: string){
    return this.birdHouseService.updateResidency(crDTO, ubid)
  }

  }