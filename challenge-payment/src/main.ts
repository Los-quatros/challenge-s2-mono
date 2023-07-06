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
  console.log('url',process.env.STRIPE_URL_FRONT);
  await app.listen();
}
bootstrap();
