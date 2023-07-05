import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
    constructor(@Inject('ORDERS_SERVICE') private readonly ordersProxy: ClientProxy) { }
    async createOrder(data: any) {
        return await lastValueFrom(this.ordersProxy.send('CreateOrder', data));
    }

    async getProductsOrder(orderId: string) {
        return await lastValueFrom(this.ordersProxy.send('GetProductsOrder', orderId));
    }
    async validateOrder(orderId : string) {
        return this.ordersProxy.emit('ValidateOrder', orderId);
    }

    async getUserIdAndTotalFromOrderId(orderId : string) : Promise<string>{
        return await lastValueFrom(this.ordersProxy.send('GetUserIdAndTotalFromOrder', orderId));
    }
   
}
