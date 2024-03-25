/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
// IsNumber,

export class createBirdHouseDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 16)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}
