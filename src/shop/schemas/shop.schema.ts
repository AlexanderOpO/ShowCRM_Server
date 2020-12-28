import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { Address } from 'src/types/address';

export type ShopDocument = Shop & mongoose.Document<mongoose.ObjectId>;

export type ShopProductType = {
  id: Types._ObjectId;
  amount: number;
};

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Shop {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  title: string;

  @Prop(
    raw({
      country: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      street: { type: String, required: true, trim: true },
      building: { type: String, required: true, trim: true },
    }),
  )
  address: Record<string, Address>;

  @Prop({
    trim: true,
    required: true,
  })
  description: string;

  @Prop({
    type: [
      raw({
        amount: {
          type: Number,
        },
        id: {
          index: true,
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      }),
    ],
    default: [],
  })
  c_product: ShopProductType[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
