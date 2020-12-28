import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { ProductModule } from './product/product.module';
import DATABASE_CONFIG from './configs/database';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProductModule,
    ShopModule,
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://${DATABASE_CONFIG.username}:${DATABASE_CONFIG.password}@shop-crm.ydao8.mongodb.net/main?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
