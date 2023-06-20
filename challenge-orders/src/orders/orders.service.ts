import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { Carrier, OrderResponseDto, Product } from './models/OrdersResponseDto';

@Injectable()
export class OrdersService {
    
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        private productsProxy: ClientProxy
    ) { 
        this.productsProxy = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://rmq-service:5672'],
              queue: 'products_queue',
              queueOptions: {
                durable: false,
              },
            },
        });
     }

    // si c'est un seller il faudra contacter alors penser a envoyer un event pour que le service seller ajoute l'id du produit au tabeau de produits du seller, si c'est un admin plus rien a faire
    async GetUserOrders( userId : string ): Promise<Array<OrderResponseDto>> {
        try {
           const orders =  await this.ordersRepository.findBy({ userId : userId });
           const ordersWithProducts : OrderResponseDto[] = []
           orders?.forEach(order => {
            const orderProductIds = order?.getOrderProductIds();
            this.productsProxy.send('getProducts', orderProductIds).subscribe((products : Array<Product>) => {
                    const carrier : Carrier = new Carrier(order.carrier);
                    const orderWithProducts: OrderResponseDto = {
                        id: order.id,
                        total: order.total,
                        is_delivered: order.is_delivered,
                        address: order.address,
                        carrier: carrier,
                        is_paid: order.is_paid,
                        products: products
                    }
                    ordersWithProducts.push(orderWithProducts);
                });
           })
           return ordersWithProducts;
        } catch (error) {
           throw new HttpException({
             status: HttpStatus.INTERNAL_SERVER_ERROR,
             error: 'Error while fetching orders',
           }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
