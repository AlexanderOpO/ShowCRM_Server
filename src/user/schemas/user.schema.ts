import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { ShopDocument } from 'src/shop/schemas/shop.schema';
import { RolesEnum } from 'src/types/roles';

export type UserDocument = User & mongoose.Document<mongoose.ObjectId>;

export type UserShopType = {
  id: Types._ObjectId;
  amount: number;
};

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  username: string;

  @Prop({
    trim: true,
    required: true,
    type: String,
  })
  password: string;

  @Prop({
    trim: true,
    required: true,
    type: String,
  })
  role: RolesEnum;

  @Prop({
    type: [
      {
        index: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
      },
    ],
    default: [],
  })
  c_shop: Types._ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
