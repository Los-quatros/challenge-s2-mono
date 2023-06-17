import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
    constructor(@Inject('PRODUCTS_SERVICE') private readonly productsProxy: ClientProxy) {}
}
