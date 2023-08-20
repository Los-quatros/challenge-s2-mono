import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Module({
    imports: [ClientsModule.register([
        {
            name: 'USERS_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${process.env.RMQ_SERVICE_HOST}:5672`],
                queue: 'users_queue',
                queueOptions: {
                    durable: false
                }
            }
        }
    ]
)],
    controllers: [],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
