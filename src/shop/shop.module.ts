import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './schemas/shop.schema';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { ProductService } from 'src/product/product.service';
import { ProductSchema, Product } from 'src/product/schemas/product.schema';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  controllers: [ShopController],
  providers: [ShopService, ProductService, UserService],
})
export class ShopModule {}
