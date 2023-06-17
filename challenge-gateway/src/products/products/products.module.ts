import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [ClientsModule.register([
    {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://rmq-service:5672"],
            queue: 'products_queue',
            queueOptions: {
                durable: false
            },
        },
    },
  ])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
