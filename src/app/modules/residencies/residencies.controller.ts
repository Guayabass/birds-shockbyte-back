/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { residenceService } from './residencies.service';

@Controller('')
export class residenceController {
  constructor(
    @Inject('RESIDENCE_SERVICE')
    private readonly residenceService: residenceService,
  ) {}

  @Get('history')
  showHistory(@Headers('x-ubid') headers: string, @Query('page') page: number) {
    //console.log(headers);

    return this.residenceService.getHistory(headers, page);
  }

  @Get('history/count/:id')
  showCount(@Param('id') ubid: string){
    return this.residenceService.getCountAll(ubid)
  }

  @Get('history/graph')
  getInfoGraph(@Headers('x-ubid') headers: string){
    return this.residenceService.fillGraph(headers)
  }
}
