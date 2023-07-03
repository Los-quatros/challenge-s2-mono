
import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';


@Module({
  imports: [ClientsModule.register([
    {
        name: 'PAYMENTS_SERVICE',
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://rmq-service:5672`],
            queue: 'payments_queue',
            queueOptions: {
              durable: false
            }
        }
    }
  ]),
  OrdersModule,
  ProductsModule
],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
