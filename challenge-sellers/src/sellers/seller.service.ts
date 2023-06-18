import { Inject, Injectable } from '@nestjs/common';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Sellers } from './entities/seller.entity';

@Injectable()
export class SellerService {

  constructor(@InjectRepository(Sellers) private readonly sellersRepository) {}

  async create(createSellerDto: CreateSellerDto) {
    const seller = this.sellersRepository.create(createSellerDto);
    await this.sellersRepository.save(seller);
    return seller;
  }

  async findAll(): Promise<Sellers[]> {
    return await this.sellersRepository.find();
  }

  async findOne(id: string): Promise<Sellers> {
    return await this.sellersRepository.findOne(id); 
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<Sellers> {
    const seller = await this.sellersRepository.findOne(id);
    if (!seller) {
      return null;
    }
    const updatedSeller = {
      ...seller,
      ...updateSellerDto,
    };
    await this.sellersRepository.save(updatedSeller);
    return updatedSeller;
  }

  async remove(id: string) {
    await this.sellersRepository.delete(id); 
  }

  async addProductToSeller(sellerId: string, productId: string): Promise<void> {
    const seller = await this.sellersRepository.findOne(sellerId);
    seller.products.push(productId);
    await this.sellersRepository.save(seller);
  }
}