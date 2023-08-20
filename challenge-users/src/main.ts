import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RMQ_SERVICE_HOST}:5672`],
      queue: 'users_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  //app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
