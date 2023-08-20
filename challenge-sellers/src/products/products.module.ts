import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { SellerModule } from 'src/sellers/seller.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RMQ_SERVICE_HOST}:5672`],
          queue: 'products_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    SellerModule,
  ],
  controllers: [],
  providers: [ProductsService],
})
export class ProductsModule {}
