import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
    constructor(@Inject('PRODUCTS_SERVICE') private readonly productsProxy: ClientProxy) {}
    
    async getProductById(id: string) {
        return await lastValueFrom(this.productsProxy.send('getProduct', id));
    }
   
}
