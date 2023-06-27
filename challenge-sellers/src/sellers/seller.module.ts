import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { DatabaseModule } from 'src/database/database.module';
import { sellerProviders } from './sellers.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SellerController],
  providers: [SellerService, ...sellerProviders],
  exports: [SellerService]
})
export class SellerModule {}
