import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rmq-service:5672`],
      queue: 'payments_queue',
      queueOptions: {
        durable: false
      }
    }
  });
  await app.listen();
}
bootstrap();
