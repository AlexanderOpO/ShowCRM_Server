import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Shop } from '../schemas/shop.schema';
import { Address } from 'src/types/address';

type UpdateShopMainDtoType = {
  readonly [K in keyof Omit<
    Shop,
    '_id' | 'created_at' | 'updated_at' | 'address' | 'c_product'
  >]: Shop[K];
};

type UpdateShopAddressDtoType = {
  readonly [K in keyof Address as `address.${K}`]: Address[K];
};

type UpdateShopDtoType = UpdateShopMainDtoType & UpdateShopAddressDtoType;

export default class implements UpdateShopDtoType {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title: UpdateShopMainDtoType['title'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description: UpdateShopMainDtoType['description'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly 'address.country': UpdateShopAddressDtoType['address.country'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly 'address.city': UpdateShopAddressDtoType['address.city'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly 'address.street': UpdateShopAddressDtoType['address.street'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly 'address.building': UpdateShopAddressDtoType['address.building'];
}
