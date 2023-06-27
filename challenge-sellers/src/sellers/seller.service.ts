import { validate } from 'class-validator';
import { Inject, Injectable, ValidationPipe } from '@nestjs/common';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto'
import { Model } from 'mongoose';
import { SellerDocument, Seller } from 'src/schema/sellers.model';
import { AccountSellerDto } from './dto/account.seller.dto';

@Injectable()
export class SellerService {

  constructor(
    @Inject('SELLER_MODEL') private sellerModel: Model<SellerDocument>
  ) {}

  async create(createSellerDto: CreateSellerDto) {
  const createdSeller = new this.sellerModel(createSellerDto);
  return createdSeller.save();
  }

  async findAll(): Promise<Seller[]> {
    return await this.sellerModel.find().exec();
  }
  
  async findOne(id: string): Promise<Seller> {
    return await this.sellerModel.findOne({ id: id });
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {

    const existingSeller = await this.sellerModel.findOneAndUpdate({ id: id }, updateSellerDto, { new: true });
    
    return existingSeller.save();
  }

  async remove(id: string): Promise<void> {
    await this.sellerModel.deleteOne({ id: id });
  }
  
  async addProductToSeller(sellerId: string, productId: string): Promise<void> {
    const seller = await this.sellerModel.findOne({ id: sellerId });
    seller.products.push(productId);
    seller.save();
  }

  async checkIfSellerIsActif(id: string): Promise<boolean> {
    const seller = await this.sellerModel.findOne({ userId: id });
    if (seller && seller.isActive) {
      return true;
    }
  
    return false;
  }

  async createSellerAccount(accountSellerDto: AccountSellerDto): Promise<CreateSellerDto> {
    const createdSeller = new this.sellerModel(accountSellerDto).save();
    return createdSeller;
  }

  async activeSeller(id: string): Promise<Seller> {
    const seller = await this.sellerModel.findOne({ id: id });
    seller.isActive = true;
    seller.save();
    
    return seller;
  }

  async refuseSeller(id: string): Promise<Seller> {
    const seller = await this.sellerModel.findOne({ id: id });
    seller.isActive = false;
    seller.save();

    return seller;
  }
}