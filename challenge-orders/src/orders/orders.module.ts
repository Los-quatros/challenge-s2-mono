import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderProduct } from './entity/orderProduct.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct]), 
  ClientsModule.register([
    {
      name : "PRODUCTS_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rmq-service:5672'],
        queue: 'products_queue',
        queueOptions: {
          durable: false,
        },
      },
  }
  ])
],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
