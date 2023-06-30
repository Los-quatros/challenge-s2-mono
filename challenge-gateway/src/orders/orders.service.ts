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

    // must return sessionId
    async CreateOrder(data : CreateOrderDto) : Promise<any> {
        // wait for order creation
        const order = await lastValueFrom(this.ordersProxy.send('CreateOrder', {data}));
        console.log(order);
        return this.ordersProxy.send('CreateOrder', {data});
        // get the order and build the products of the order
        // this.paymentService.CreatePayment(order)
    }

    async GetOrder(id : string) : Promise<any> {
        return this.ordersProxy.send('GetOrder', {id});
    }

    async GetOrders() : Promise<any> {
        let orders : Array<OrderResponseDto> = await lastValueFrom( this.ordersProxy.send('GetAllOrders', {}));
        return this.AsignProductsAddressAndCarrierToOrder(orders);
    }

    async GetOrderProduct(idOrderProduct : string) : Promise<any>{
        return this.ordersProxy.send('GetOrderProduct', {idOrderProduct});
    }

    async GetOrderProductsIdsByProductIds(productIds : Array<string>) : Promise<Array<string>>{
        const ordersWithSellerProductsOnly : Array<OrderResponseDto> =  await lastValueFrom(this.ordersProxy.send('GetOrderProductsByProducts', {productIds}));
        const result : Array<string> = [];
        for(let op of ordersWithSellerProductsOnly){
            op['orderProducts'].forEach((op) => {
                result.push(op['id']);
            })
        }
        return result;
    }

    async GetOrderProductsByProductIds(productIds : Array<string>) : Promise<Array<OrderResponseDto>> {
        const ordersWithSellerProductsOnly : Array<OrderResponseDto> =  await lastValueFrom(this.ordersProxy.send('GetOrderProductsByProducts', {productIds}));
        const resultWithCarrierProductsAndAddress = await this.AsignProductsAddressAndCarrierToOrder(ordersWithSellerProductsOnly);    
        return resultWithCarrierProductsAndAddress;
    }

    async UpdateNbItemReturnedForOrderProduct(id : string, quantity : number){
        return this.ordersProxy.send('UpdateNbItemReturned', {id, quantity});
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

    public async AssignProductToOrderProduct(orderProduct : OrderProductDto){
        const product : Product = await firstValueFrom(await this.productsService.GetProductById(orderProduct.product.id));
        orderProduct.product = product;
        return orderProduct;
    }
    
}
