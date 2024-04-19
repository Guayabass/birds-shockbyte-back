/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { residencyHistory } from './residencyHistory';
import { residenceService } from './residencies.service';
import { residenceController } from './residencies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([residencyHistory])],
  controllers: [residenceController],
  providers: [
    {
      provide: 'RESIDENCE_SERVICE',
      useClass: residenceService,
    },
  ],
})
export class residenceModule {}
