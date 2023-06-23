import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AddressesService } from 'src/addresses/addresses.service';
import { CarriersService } from 'src/carriers/carriers/carriers.service';
import { ProductsService } from 'src/products/products.service';
import { CreateOrderDto } from './models/CreateOrderDto';
import { Address, Carrier, OrderProductDto, OrderResponseDto, Product } from './models/ordersResponseDto';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
    constructor(@Inject('ORDERS_SERVICE') private readonly ordersProxy: ClientProxy,
    private readonly addressesService : AddressesService, 
    private readonly carriersService : CarriersService,
    private readonly productsService : ProductsService
    ) {}

    async GetOrdersByUser(userId : string) : Promise<Array<OrderResponseDto>>{
        var orders : Array<OrderResponseDto> = await lastValueFrom( this.ordersProxy.send('GetUserOrders', {userId}));
        return this.AsignProductsAddressAndCarrierToOrder(orders);
    }

    async CreateOrder(data : CreateOrderDto) : Promise<any> {
        return this.ordersProxy.send('CreateOrder', {data});
    }

    async GetOrders() : Promise<any> {
        var orders : Array<OrderResponseDto> = await lastValueFrom( this.ordersProxy.send('GetAllOrders', {}));
        return this.AsignProductsAddressAndCarrierToOrder(orders);
    }

    async GetSellerSales(idSeller : string) {
        return this.ordersProxy.send('GetSellerSales', {idSeller});
    }

    private async AsignProductsAddressAndCarrierToOrder(orders : Array<OrderResponseDto>){
        const ordersResponse : Array<OrderResponseDto> = [];
        for(let order of orders){
            const address : Address = await firstValueFrom(await this.addressesService.GetAddressById(order.address.id));
            const carrier : Carrier = await firstValueFrom(await this.carriersService.GetCarrierById(order.carrier.id));
            // get all product of orders
            const products : Array<OrderProductDto> = [];
            for(let item of order['orderProducts']){
                const product : Product = await firstValueFrom(await this.productsService.GetProductById(item['product']['id']));
                products.push( new OrderProductDto(item['id'], product, item['quantity'], item['is_returned'], item['orderId']) );
            }

            order.id = order['id'];
            order.is_delivered = order['is_delivered'];
            order.is_paid = order['is_paid'];
            order.total = order['total'];
            order.address = address;
            order.carrier = carrier;
            order.products = products;
            ordersResponse.push(order);
        }
        
        return ordersResponse;
    }
}
