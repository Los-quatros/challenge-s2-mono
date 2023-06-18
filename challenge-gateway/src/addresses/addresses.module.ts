import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [ClientsModule.register([
    {
        name: 'ADDRESSES_SERVICE',
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://rmq-service:5672"],
            queue: 'addresses_queue',
            queueOptions: {
                durable: false
            },
        },
    },
  ])],
  controllers: [AddressesController],
  providers: [AddressesService]
})
export class AddressesModule {}
