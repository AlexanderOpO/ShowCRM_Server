import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & mongoose.Document<mongoose.ObjectId>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Product {
  @Prop({
    required: true,
    unique: true,
  })
  title: string;

  @Prop({
    trim: true,
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  mass: number;

  @Prop({
    type: Number,
    default: 0,
  })
  amount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
