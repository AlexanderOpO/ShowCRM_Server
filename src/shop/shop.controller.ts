import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import AddProductDto from './dto/add-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import CreateShopDto from './dto/create-shop.dto';
import UpdateShopDto from './dto/update-shop.dto';
import { Shop, ShopDocument } from './schemas/shop.schema';
import { ShopService } from './shop.service';
import { GetToken } from 'src/utils/decorators/get-token.decorator';
import { AuthGuard } from 'src/utils/auth.guard';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @GetToken() token: string,
    @Body() body: CreateShopDto,
  ): Promise<ShopDocument> {
    return this.shopService.create(token, body);
  }

  @Get('all')
  @UseGuards(AuthGuard)
  getAll(@GetToken() token: string): Promise<ShopDocument[]> {
    return this.shopService.getAll();
  }

  @Get('products/:id')
  @UseGuards(AuthGuard)
  getStorages(@Param('id') id: string) {
    return this.shopService.getProducts(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id') id: string): Promise<ShopDocument> {
    return this.shopService.getById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Body() updateShopDto: UpdateShopDto,
    @Param('id') id: string,
  ): Promise<Shop> {
    return this.shopService.update(id, updateShopDto);
  }

  @Post('add_product')
  @UseGuards(AuthGuard)
  addProduct(@Body() addProductDto: AddProductDto) {
    return this.shopService.addProduct(
      addProductDto.shop_id,
      addProductDto.product_id,
    );
  }

  @Post('update_product')
  @UseGuards(AuthGuard)
  updateProductAmount(@Body() updateProductDto: UpdateProductDto) {
    return this.shopService.updateProductAmount(
      updateProductDto.shop_id,
      updateProductDto.product_id,
      updateProductDto.amount,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string): Promise<ShopDocument> {
    return this.shopService.removeById(id);
  }
}
