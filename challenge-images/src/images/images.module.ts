
import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';

@Module({

  imports: [ClientsModule.register([
    {
      name: 'IMAGES_SERVICE',
      transport: Transport.RMQ,
      options: {
          urls: [`amqp://rmq-service:5672`],
          queue: 'images_queue',
          queueOptions: {
            durable: false
          }
      }
    }]),
    MulterModule.register({
      dest: './uploads/',
    }),
  ],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
