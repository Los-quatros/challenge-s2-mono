import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SellersService } from './sellers.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SELLERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RMQ_SERVICE_HOST}:5672`],
          queue: 'sellers_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [SellersService],
  exports: [SellersService],
})
export class SellersModule {}
