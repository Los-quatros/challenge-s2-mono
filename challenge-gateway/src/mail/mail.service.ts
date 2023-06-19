import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MailService {
    constructor(@Inject('MAIL_SERVICE') private readonly mailProxy: ClientProxy) {}

    async sendMailBecomeSeller(email: string): Promise<Object> {
         return (await lastValueFrom(this.mailProxy.send('becomeSellerMail', email)));
    }

    async sendMailBecomeSellerAccepted(email: string): Promise<Object> {
        return (await lastValueFrom(this.mailProxy.send('becomeSellerAcceptedMail', email)));
    }

}
