import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './models/CreateProductDto';
import { UpdateProductDto } from './models/UpdateProductDto';
import { UpdateProductsQuantityDto } from './models/UpdateProductsQuantityDto';
import { ProductsService } from './products.service';
import {
  AuthenticationRequired,
  HasRole,
} from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @AuthenticationRequired()
  @HasRole(Role.SELLER)
  @Post()
  async Post(
    @Body(new ValidationPipe({ transform: true })) product: CreateProductDto,
  ) {
    return this.productsService.CreateProduct(product);
  }

  @AuthenticationRequired()
  @HasRole(Role.SELLER)
  @Patch('/updateQuantity')
  async UpdateProductQuantity(
    @Body(new ValidationPipe({ transform: true }))
    updateProductsQuantityDto: UpdateProductsQuantityDto,
  ) {
    return this.productsService.UpdateProductsQuantity(
      updateProductsQuantityDto,
    );
  }

  // TODO : PRODUCT
  @Get()
  async GetAllProducts() {
    return this.productsService.GetAllProducts();
  }

  // TODO : PRODUCT
  @Get('/:id')
  async GetProductById(@Param() productId: string) {
    return this.productsService.GetProductById(productId);
  }

  @AuthenticationRequired()
  @HasRole(Role.SELLER)
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

  // TODO : PRODUCT
  @AuthenticationRequired()
  @HasRole(Role.SELLER)
  @Get('/sellers/:id')
  async GetSellerProducts(@Param() idSeller: string) {
    return this.productsService.GetSellerProducts(idSeller['id']);
  }
}
