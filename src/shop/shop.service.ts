import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import CreateShopDto from './dto/create-shop.dto';
import UpdateShopDto from './dto/update-shop.dto';
import { Shop, ShopDocument } from './schemas/shop.schema';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly productService: ProductService,
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
  ) {}

  async create(userId: string, createShopDto: CreateShopDto) {
    const createdShop = new this.shopModel(createShopDto);
    await createdShop.save();
    await this.userService.addShop(userId, createdShop._id.toString());
    return createdShop;
  }

  async getById(id: string) {
    return this.shopModel.findById(id);
  }

  async getAll() {
    return this.shopModel.find();
  }

  async getProducts(id: string) {
    const shop = await this.shopModel
      .findById(id)
      .populate('c_product.id')
      .exec();
    return shop;
  }

  async update(id, updateShopDto: UpdateShopDto) {
    return this.shopModel.findByIdAndUpdate(id, updateShopDto, {
      useFindAndModify: false,
    });
  }

  async removeById(id: string) {
    return this.shopModel.remove({ _id: id });
  }

  async addProduct(shopId: string, productId: string) {
    return this.shopModel.findByIdAndUpdate(
      shopId,
      {
        $push: {
          c_product: {
            id: new Types.ObjectId(productId),
            amount: 0,
          },
        },
      },
      { useFindAndModify: false },
    );
  }

  async updateProductAmount(
    shopId: string,
    productId: string,
    newAmount: number,
  ) {
    const productObjectId = new Types.ObjectId(productId);
    const shop = await this.shopModel.findById(shopId, {
      c_product: {
        $elemMatch: {
          id: productObjectId,
        },
      },
    });
    await shop.update({
      $pull: {
        c_product: {
          id: productObjectId,
        },
      },
    });
    await shop.update({
      $addToSet: {
        c_product: {
          id: productObjectId,
          amount: newAmount,
        },
      },
    });
    return shop;
  }
}
