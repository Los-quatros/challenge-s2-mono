import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Module({
    imports: [ClientsModule.register([
        {
            name: 'ORDERS_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${process.env.RMQ_SERVICE_HOST}:5672`],
                queue: 'orders_queue',
                queueOptions: {
                    durable: false
                }
            }
        }
    ]
)],
    controllers: [],
    providers: [OrdersService],
    exports: [OrdersService]
})
export class OrdersModule {}
