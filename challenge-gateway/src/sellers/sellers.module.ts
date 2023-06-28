import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
    imports: [OrdersModule, ProductsModule, MailModule, UsersModule, ClientsModule.register([
        {
            name: 'SELLERS_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://rmq-service:5672`],
                queue: 'sellers_queue',
                queueOptions: {
                    durable: false
                }
            }
        }
    ])],
    controllers: [SellersController],
    providers: [SellersService],
    exports: [SellersService]
})
export class SellersModule {}
