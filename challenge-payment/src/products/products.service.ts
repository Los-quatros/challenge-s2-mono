import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
    constructor(@Inject('PRODUCTS_SERVICE') private readonly productsProxy: ClientProxy) { }
   
}
