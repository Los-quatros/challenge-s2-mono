import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './models/CreateProductDto';
import { UpdateProductDto } from './models/UpdateProductDto';
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

    async UpdateProduct(productId : string ,data : UpdateProductDto){
        return this.productsProxy.send('UpdateProduct', {productId,data});
    }

    async GetCategories() {
        return this.productsProxy.send('GetAllCategories', {});
    }



}
