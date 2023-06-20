import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
    imports: [MailerModule.forRoot({
        transport: {
            host: 'smtp.hostinger.com',
            port: 465,
            auth: {
                user: process.env.EMAIL_SERVER,
                pass: process.env.EMAIL_PASSWORD
            }
        }
    })],
    controllers: [MailController],
    providers: [MailService],
    exports: [],
})
export class MailModule {}
