import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from '../schemas/product.schema';

type UpdateProductDtoType = {
  readonly [K in keyof Omit<
    Product,
    '_id' | 'created_at' | 'updated_at' | 'article_number'
  >]: Product[K];
};

export default class implements UpdateProductDtoType {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly title: UpdateProductDtoType['title'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description: UpdateProductDtoType['description'];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly mass: UpdateProductDtoType['mass'];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly amount: UpdateProductDtoType['amount'];
}
