import { Module } from '@nestjs/common';
import { Product } from './Entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './Entity/category.entity';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [ImagesModule,TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
