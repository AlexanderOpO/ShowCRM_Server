import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export default class {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly shop_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly product_id: string;
}
