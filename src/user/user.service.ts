import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, SchemaTypes, Types } from 'mongoose';
import { ShopDocument } from 'src/shop/schemas/shop.schema';
import { ShopService } from 'src/shop/shop.service';
import { RolesEnum } from 'src/types/roles';
import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { User, UserDocument } from './schemas/user.schema';

type UserMetaData = {
  token: string;
  role: RolesEnum;
};

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => ShopService))
    private readonly shopService: ShopService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserMetaData> {
    const createdUser = new this.userModel({
      ...createUserDto,
      role: RolesEnum.ShopManager,
    });
    await createdUser.save();
    return {
      token: createdUser._id.toString(),
      role: createdUser.role,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserMetaData> {
    const user = await this.userModel.findOne({
      username: loginUserDto.username,
      password: loginUserDto.password,
    });

    return {
      token: user._id.toString(),
      role: user.role,
    };
  }

  async addShop(userId: string, id: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          c_shop: new Types.ObjectId(id),
        },
      },
      { useFindAndModify: false },
    );
  }

  async removeShop(userId: string, id: string) {
    await this.shopService.removeById(id);
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          c_shop: new Types.ObjectId(id),
        },
      },
      { useFindAndModify: false },
    );
  }

  async getShopList(id: string) {
    const user = await this.userModel
      .findOne({
        _id: (id as unknown) as Schema.Types.ObjectId,
      })
      .populate('c_shop')
      .exec();
    return user;
  }

  async isExist(id: string) {
    return this.userModel.exists(new SchemaTypes.ObjectId(id));
  }
}
