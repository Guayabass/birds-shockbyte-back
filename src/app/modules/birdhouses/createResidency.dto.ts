/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from 'class-validator';
// IsNumber,

export class createResidencyDTO {

  @IsNotEmpty()
  @IsNumber()
  birds: number;

  @IsNotEmpty()
  @IsNumber()
  eggs: number;
}
