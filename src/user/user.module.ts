import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Shop, ShopSchema } from 'src/shop/schemas/shop.schema';
import { ShopService } from 'src/shop/shop.service';
import { ProductService } from 'src/product/product.service';
import { Product, ProductSchema } from 'src/product/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, ShopService, ProductService],
})
export class UserModule {}
