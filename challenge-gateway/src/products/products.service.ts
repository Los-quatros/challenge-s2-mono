import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './models/CreateProductDto';
import { UpdateProductsQuantityDto } from './models/UpdateProductsQuantityDto';

@Injectable()
export class ProductsService {
    constructor(@Inject('PRODUCTS_SERVICE') private readonly productsProxy: ClientProxy) {}

    async CreateProduct(product : CreateProductDto) {
        return this.productsProxy.send('createProduct', {product});
    }

    async UpdateProductsQuantity(updateProductsQuantityDto : UpdateProductsQuantityDto){
        return this.productsProxy.send('updateProductsQuantity', {updateProductsQuantityDto})
    }

    async GetAllProducts(){
        return this.productsProxy.send('getAllProducts', {})
    }
    
    async GetProductsByIds(values : Array<string>){
        return this.productsProxy.send('getProducts', {values})
    }



}
