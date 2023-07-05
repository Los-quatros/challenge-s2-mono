import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailsService } from './email.service';

@Module({
    imports: [ClientsModule.register([
        {
            name: 'MAILS_SERVICE',
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://rmq-service:5672`],
                queue: 'mailer_queue',
                queueOptions: {
                    durable: false
                }
            }
        }
    ]
)],
    controllers: [],
    providers: [MailsService],
    exports: [MailsService]
})
export class MailsModule {}
