import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { NewSellerDto } from './dto/newSeller.dto';
import { UpdateSellerDto } from './dto/updateSeller.dto';

@Injectable()
export class SellerService {
  private readonly sellers: any[] = [];

  create(newSellerDto: NewSellerDto) {
    const seller = {
      id: uuid(),
      ...newSellerDto,
    };
    this.sellers.push(seller);
    return seller;
  }

  findAll() {
    return this.sellers;
  }

  findOne(id: string) {
    return this.sellers.find((seller) => seller.id === id);
  }

  update(id: string, updateSellerDto: UpdateSellerDto) {
    const sellerIndex = this.sellers.findIndex((seller) => seller.id === id);
    if (sellerIndex === -1) {
      return null;
    }
    this.sellers[sellerIndex] = {
      ...this.sellers[sellerIndex],
      ...updateSellerDto,
    };
    return this.sellers[sellerIndex];
  }

  remove(id: string) {
    const sellerIndex = this.sellers.findIndex((seller) => seller.id === id);
    if (sellerIndex === -1) {
      return null;
    }
    const [seller] = this.sellers.splice(sellerIndex, 1);
    return seller;
  }
}