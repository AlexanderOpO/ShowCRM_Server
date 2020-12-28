import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async getById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id);
  }

  async getAll() {
    const data = await this.productModel.find({}).exec();
    return data;
  }

  async getByShopId() {
    return this.productModel.find().exec();
  }

  async update(
    id,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      useFindAndModify: false,
    });
  }

  async removeById(id: string): Promise<ProductDocument> {
    return this.productModel.remove({ _id: id });
  }
}
