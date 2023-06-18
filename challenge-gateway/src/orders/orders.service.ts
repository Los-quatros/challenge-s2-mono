import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Address, orderResponseDto } from './models/ordersResponseDto';

@Injectable()
export class OrdersService {
    constructor(@Inject('ORDERS_SERVICE') private readonly ordersProxy: ClientProxy,
    private readonly addressesProxy : ClientProxy ) {
        this.addressesProxy = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://rmq-service:5672'],
              queue: 'addresses_queue',
              queueOptions: {
                durable: false,
              },
            },
        });
    }

    async GetOrdersByUser(userId : string) : Promise<Array<orderResponseDto>>{
        const ordersResponse : Array<orderResponseDto> = [];
        const toto = this.ordersProxy.send('GetUserOrders', {userId}).subscribe((orders : Array<orderResponseDto>) => {
            orders?.forEach((order : orderResponseDto) => {
                const idAddress = order.address;
                this.addressesProxy.send('GetAddressById', {idAddress}).subscribe((address : Address) => {
                    order.address = address
                })
                // retreive the address and the carriers 
                // create the services in the gateway 
            });
        });
        return ordersResponse;
    }
}
