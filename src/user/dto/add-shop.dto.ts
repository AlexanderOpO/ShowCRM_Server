import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { User } from '../schemas/user.schema';

export default class {
  @ApiProperty()
  @IsNotEmpty()
  readonly shop_id: string;
}
