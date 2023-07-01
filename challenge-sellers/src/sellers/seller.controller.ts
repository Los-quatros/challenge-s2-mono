import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { Seller } from '../schema/sellers.model';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AccountSellerDto } from './dto/account.seller.dto';

@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @EventPattern('getSellers')
  @Get()
  async findAll(): Promise<Seller[]> {
    return await this.sellerService.findAll();
  }

  @EventPattern('getSeller')
  async findOne(@Payload('id') id: string): Promise<Seller> {
    return await this.sellerService.findOne(id);
  }

  @EventPattern('updateSeller')
  async update(
    @Payload()
    { id, updateSellerDto }: { id: string; updateSellerDto: UpdateSellerDto },
  ): Promise<Seller> {
    return await this.sellerService.update(id, updateSellerDto);
  }

  @EventPattern('create-seller')
  async create(
    @Payload() createSellerDto: CreateSellerDto,
  ): Promise<CreateSellerDto> {
    return await this.sellerService.create(createSellerDto);
  }

  @EventPattern('delete-seller')
  async delete(@Payload() id: string): Promise<void> {
    await this.sellerService.remove(id);
  }

  @EventPattern('checkIfSellerIsActif')
  async checkIfSellerIsActif(@Payload() id: string): Promise<boolean> {
    return await this.sellerService.checkIfSellerIsActif(id);
  }

  @EventPattern('createSellerAccount')
  async createSellerAccount(
    @Payload() accountSellerDto: AccountSellerDto,
  ): Promise<CreateSellerDto> {
    return await this.sellerService.createSellerAccount(accountSellerDto);
  }

  @EventPattern('activeSeller')
  async activeSeller(@Payload() id: string): Promise<Seller> {
    return await this.sellerService.activeSeller(id);
  }

  @EventPattern('refuseSeller')
  async refuseSeller(@Payload() id: string): Promise<Seller> {
    return await this.sellerService.refuseSeller(id);
  }
}
