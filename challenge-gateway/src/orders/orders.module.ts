import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AddressesModule } from 'src/addresses/addresses.module';
import { CarriersModule } from 'src/carriers/carriers/carriers.module';
import { ProductsModule } from 'src/products/products.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [ProductsModule,CarriersModule,AddressesModule,ClientsModule.register([
    {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://rmq-service:5672"],
            queue: 'orders_queue',
            queueOptions: {
                durable: false
            },
        },
    },
  ])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
