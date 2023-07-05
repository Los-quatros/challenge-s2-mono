import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './models/CreateProductDto';
import { UpdateProductDto } from './models/UpdateProductDto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsProxy: ClientProxy,
  ) {}

  async CreateProduct(product: CreateProductDto) {
    return this.productsProxy.send('createProduct', { product });
  }

  async GetAllProducts() {
    return this.productsProxy.send('getAllProducts', {});
  }

  async GetProductById(value: string): Promise<any> {
    return this.productsProxy.send('getProduct',  value );
  }

  async UpdateProduct(productId: string, data: UpdateProductDto) {
    return this.productsProxy.send('UpdateProduct', { productId, data });
  }

  async GetCategories() {
    return this.productsProxy.send('GetAllCategories', {});
  }

  async GetSellerProducts(id: string) {
    return this.productsProxy.send('GetSellerProducts', { id });
  }
}
