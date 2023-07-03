import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

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
        }
    ])],
    controllers: [ImagesController],
    providers: [ImagesService],
    exports: [ImagesService]
})
export class ImagesModule {}
