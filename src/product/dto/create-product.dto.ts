import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Product } from '../schemas/product.schema';

type CreateProductDtoType = Pick<
  Product,
  'title' | 'description' | 'mass' | 'amount'
>;

export default class implements CreateProductDtoType {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: CreateProductDtoType['title'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: CreateProductDtoType['description'];

  @ApiProperty()
  // @IsNumber()
  @IsNotEmpty()
  readonly mass: CreateProductDtoType['mass'];

  @ApiProperty()
  @IsOptional()
  // @IsNumber()
  @IsNotEmpty()
  readonly amount: CreateProductDtoType['amount'];
}
