import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AddressesService } from 'src/addresses/addresses.service';
import { CarriersService } from 'src/carriers/carriers/carriers.service';
import { ProductsService } from 'src/products/products.service';
import { CreateOrderDto } from './models/CreateOrderDto';
import { Address, Carrier, OrderProductDto, OrderResponseDto, Product } from './models/ordersResponseDto';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { PaymentService } from 'src/payment/payment.service';

@Injectable()
export class OrdersService {
    constructor(@Inject('ORDERS_SERVICE') private readonly ordersProxy: ClientProxy,
    private readonly addressesService : AddressesService, 
    private readonly carriersService : CarriersService,
    private readonly productsService : ProductsService,
    private readonly paymentsService : PaymentService
    ) {}

    async GetOrdersByUser(userId : string) : Promise<Array<OrderResponseDto>>{
        var orders : Array<OrderResponseDto> = await lastValueFrom( this.ordersProxy.send('GetUserOrders', {userId}));
        return this.AsignProductsAddressAndCarrierToOrder(orders);
    }

    async CreateOrder(data : CreateOrderDto) : Promise<any> {
        const result : any = await lastValueFrom(this.ordersProxy.send('CreateOrder', {data}));
        this.paymentsService.createCheckoutSession(result);

        return ;

    }

    async GetOrders() : Promise<any> {
        let orders : Array<OrderResponseDto> = await lastValueFrom( this.ordersProxy.send('GetAllOrders', {}));
        return this.AsignProductsAddressAndCarrierToOrder(orders);
    }

    async GetOrderProductsByProductIds(productIds : Array<string>) : Promise<Array<OrderResponseDto>> {
        const ordersWithSellerProductsOnly : Array<OrderResponseDto> =  await lastValueFrom(this.ordersProxy.send('GetOrderProductsByProducts', {productIds}));
        const resultWithCarrierProductsAndAddress = await this.AsignProductsAddressAndCarrierToOrder(ordersWithSellerProductsOnly);    
        return resultWithCarrierProductsAndAddress;
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
                products.push( new OrderProductDto(item['id'], product, item['quantity'], item['is_returned'], item['orderId'], item['nbProductReturned']) );
            }

            order.orderId = order['orderId'];
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

    async GetProductsOrder(orderId: string) : Promise<any> {
        const result : any = await lastValueFrom(this.ordersProxy.send('GetProductsOrder', {orderId}));
    
        return result;

    }
}
