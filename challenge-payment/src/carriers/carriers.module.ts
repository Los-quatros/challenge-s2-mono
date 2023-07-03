import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CarriersService } from './carriers.service';

@Module({
    imports: [ClientsModule.register([
        {
            name: 'CARRIERS_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://rmq-service:5672`],
                queue: 'carriers_queue',
                queueOptions: {
                    durable: false
                }
            }
        }
    ]
)],
    controllers: [],
    providers: [CarriersService],
    exports: [CarriersService]
})
export class CarriersModule {}
