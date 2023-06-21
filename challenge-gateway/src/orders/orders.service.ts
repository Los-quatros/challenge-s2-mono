import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AddressesService } from 'src/addresses/addresses.service';
import { CarriersService } from 'src/carriers/carriers/carriers.service';
import { CreateOrderDto } from './models/CreateOrderDto';
import { Address, Carrier, orderResponseDto } from './models/ordersResponseDto';

@Injectable()
export class OrdersService {
    constructor(@Inject('ORDERS_SERVICE') private readonly ordersProxy: ClientProxy,
    private readonly addressesService : AddressesService, 
    private readonly carriersService : CarriersService
    ) {}

    async GetOrdersByUser(userId : string) : Promise<Array<orderResponseDto>>{
        const ordersResponse : Array<orderResponseDto> = [];
        this.ordersProxy.send('GetUserOrders', {userId}).subscribe((orders : Array<orderResponseDto>) => {
            orders?.forEach(async (order : orderResponseDto) => {
                const tmp = new Carrier();
                const address = await this.addressesService.GetAddressById(order.address.id);
                const carrier = await this.carriersService.GetCarrierById(order.carrier.id);
                order.address = address;
                order.carrier = carrier;
            });
        });
        return ordersResponse;
    }

    async CreateOrder(data : CreateOrderDto) : Promise<any> {
        return await this.ordersProxy.send('CreateOrder', {data});
    }

    async GetOrders() : Promise<any> {
        return await this.ordersProxy.send('GetAllOrders', {});
    }
}
