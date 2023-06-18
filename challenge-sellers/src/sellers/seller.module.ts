import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { Sellers } from './entities/seller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sellers])],
  controllers: [SellerController],
  providers: [SellerService, ],
  exports: [SellerService]
})
export class SellerModule {}
