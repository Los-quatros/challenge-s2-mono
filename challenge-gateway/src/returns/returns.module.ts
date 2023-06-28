import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReturnsController } from './returns.controller';
import { ReturnsService } from './returns.service';


@Module({
  imports: [ClientsModule.register([
    {
        name: 'RETURNS_SERVICE',
        transport: Transport.RMQ,
        options: {
            urls: ["amqp://rmq-service:5672"],
            queue: 'returns_queue',
            queueOptions: {
                durable: false
            },
        },
    },
  ])],
  controllers: [ReturnsController],
  providers: [ReturnsService],
  exports: [ReturnsService]
})
export class ReturnsModule {}
