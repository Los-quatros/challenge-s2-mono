import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SellerService } from './seller.service';
import { Sellers } from './entities/seller.entity';
import { NewSellerDto, UpdateSellerDto } from './dto';

@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get()
  async findAll(): Promise<Sellers[]> {
    return await this.sellerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sellers> {
    return await this.sellerService.findOne(id);
  }

  @Post()
  async create(@Body() newSellerDto: NewSellerDto): Promise<Sellers> {
    return await this.sellerService.create(newSellerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ): Promise<Sellers> {
    return await this.sellerService.update(id, updateSellerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.sellerService.remove(id);
  }
}