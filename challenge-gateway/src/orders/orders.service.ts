import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AddressesService } from 'src/addresses/addresses.service';
import { CarriersService } from 'src/carriers/carriers/carriers.service';
import { CreateOrderDto } from './models/CreateOrderDto';
import { Address, orderResponseDto } from './models/ordersResponseDto';

@Injectable()
export class OrdersService {
    constructor(@Inject('ORDERS_SERVICE') private readonly ordersProxy: ClientProxy,
    private readonly addressesService : AddressesService, 
    private readonly carriersService : CarriersService
    ) {}

    async GetOrdersByUser(userId : string) : Promise<Array<orderResponseDto>>{
        const ordersResponse : Array<orderResponseDto> = [];
        const toto = this.ordersProxy.send('GetUserOrders', {userId}).subscribe((orders : Array<orderResponseDto>) => {
            orders?.forEach(async (order : orderResponseDto) => {
                const idAddress = order.address.id;
                const address = await this.addressesService.GetAddressById(idAddress);
                order.address = address;
                // retreive and the carriers 
                // create the services in the gateway 
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
