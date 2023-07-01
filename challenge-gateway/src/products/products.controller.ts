import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateProductDto } from './models/CreateProductDto';
import { UpdateProductDto } from './models/UpdateProductDto';
import { UpdateProductsQuantityDto } from './models/UpdateProductsQuantityDto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async Post(
    @Body(new ValidationPipe({ transform: true })) product: CreateProductDto,
  ) {
    return this.productsService.CreateProduct(product);
  }

  @Patch('/updateQuantity')
  async UpdateProductQuantity(
    @Body(new ValidationPipe({ transform: true }))
    updateProductsQuantityDto: UpdateProductsQuantityDto,
  ) {
    return this.productsService.UpdateProductsQuantity(
      updateProductsQuantityDto,
    );
  }

  @Get()
  async GetAllProducts() {
    return this.productsService.GetAllProducts();
  }

  @Get('/:id')
  async GetProductById(@Param() productId: string) {
    return this.productsService.GetProductById(productId);
  }

  @Patch('/:id')
  async UpdateProduct(
    @Param() productId: string,
    @Body() body: UpdateProductDto,
  ) {
    return this.productsService.UpdateProduct(productId, body);
  }

  @Get('/categories/all')
  async GetCategories() {
    return this.productsService.GetCategories();
  }
  @Get('/sellers/:id')
  async GetSellerProducts(@Param() idSeller: string) {
    return this.productsService.GetSellerProducts(idSeller['id']);
  }
}
