import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SellerService } from './seller.service';
import { Sellers } from './entities/seller.entity';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @EventPattern('find-sellers')
  @Get()
  async findAll(): Promise<Sellers[]> {
    return await this.sellerService.findAll();
  }

  @EventPattern('find-seller')
  async findOne(@Param('id') id: string): Promise<Sellers> {
    return await this.sellerService.findOne(id);
  }

  @EventPattern('create-seller')
  async create(@Body() createSellerDto: CreateSellerDto): Promise<CreateSellerDto> {
    return await this.sellerService.create(createSellerDto);
  }

  @EventPattern('update-seller')
  async update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ): Promise<Sellers> {
    return await this.sellerService.update(id, updateSellerDto);
  }

  @EventPattern('delete-seller')
  async delete(@Param('id') id: string): Promise<void> {
    await this.sellerService.remove(id);
  }

  
}