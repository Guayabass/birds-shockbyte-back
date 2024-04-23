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
  Headers,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
// import { CreateUserDto } from 'src/app/modules/users-auth/CreateUser.dto';
// import { LoginUser } from 'src/app/modules/users-auth/LoginUser.dto';
// // import { UpdateUserDto } from 'src/users-auth/dto/UpdateUser.dto';
// import { UserNotFoundException } from 'src/core/exceptions/UserNotFound.exception';
import { BirdHousesService } from './birdhouses.service';
import { createBirdHouseDto } from './createBirdHouse.dto';
import { createResidencyDTO } from '../residencies/createResidency.dto';
import { updateBirdHouseDto } from './updateBirdHouse.dto';

@Controller('house')
export class BirdHouseController {
  constructor(
    @Inject('BIRDHOUSE_SERVICE') private readonly birdHouseService: BirdHousesService,
  ) {}

  @Post('')
  @UsePipes(ValidationPipe)
  createUser(@Body() bhDTO: createBirdHouseDto[] | createBirdHouseDto) {
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

  @Get(':id')
  showBirdHouse(@Headers('x-ubid') headers: string, @Param('id') ubid: string){
    return this.birdHouseService.getBirdHouse(headers, ubid)
  }

  @Patch(':id')
  updateBirdHouse(@Headers('x-ubid') headers: string, @Param('id') ubid: string, @Body() uBHDTO: updateBirdHouseDto,){
    return this.birdHouseService.updateBirdHouse(headers, ubid, uBHDTO)
  }
  }