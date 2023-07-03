
import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { Image } from '../entity/images.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';



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
      storage: diskStorage({
        destination: './uploads/',

      }),
    }),
    TypeOrmModule.forFeature([Image])
  ],
  
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
