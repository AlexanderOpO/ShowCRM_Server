import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export default class {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly shop_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly product_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
}
