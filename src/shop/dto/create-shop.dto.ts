import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { Shop } from '../schemas/shop.schema';

type CreateShopDtoType = Pick<Shop, 'title' | 'address' | 'description'>;

export default class implements CreateShopDtoType {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: CreateShopDtoType['title'];

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  readonly address: CreateShopDtoType['address'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: CreateShopDtoType['description'];
}
