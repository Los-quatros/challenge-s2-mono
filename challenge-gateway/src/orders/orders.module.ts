import { ClientsModule, Transport } from '@nestjs/microservices';

import { AddressesModule } from 'src/addresses/addresses.module';
import { CarriersModule } from 'src/carriers/carriers/carriers.module';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PaymentModule } from 'src/payment/payment.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PaymentModule,
    ProductsModule,
    CarriersModule,
    AddressesModule,
    UsersModule,
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rmq-service:5672'],
          queue: 'orders_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
