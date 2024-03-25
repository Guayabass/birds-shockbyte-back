/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
//import { databaseProviders } from 'src/shared/typeorm/database.providers';
import { BirdHouseModule } from './birdhouses/birdhouse.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BirdHouse } from './birdhouses/BirdHouse';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BirdHouseModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [BirdHouse],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  exports: [],
  providers: [],
})
export class AppModule {}
