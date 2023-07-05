import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateProductsQuantityDto } from './models/UpdateProductsQuantity';

@Injectable()
export class ProductsService {
    constructor(@Inject('PRODUCTS_SERVICE') private readonly productsProxy: ClientProxy) {}
    
    async getProductById(id: string) {
        return await lastValueFrom(this.productsProxy.send('getProduct', id));
    }

    async UpdateStockProduct(updateProductQuantity : UpdateProductsQuantityDto){
        return this.productsProxy.emit('updateProductsQuantity', updateProductQuantity);
    }
   
}
