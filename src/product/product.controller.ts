import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/utils/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateProductDto): Promise<ProductDocument> {
    return this.productService.create(body);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  getAll(): Promise<ProductDocument[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getById(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.getById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.removeById(id);
  }
}
