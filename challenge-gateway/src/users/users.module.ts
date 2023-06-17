import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
    imports: [ClientsModule.register([
        {
            name: 'USERS_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: ["amqp://rmq-service:5672"],
                queue: 'users_queue',
                queueOptions: {
                    durable: false
                },
            },
        },
    ])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
