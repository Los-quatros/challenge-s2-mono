import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MailsService {
    constructor(@Inject('MAILS_SERVICE') private readonly mailClient: ClientProxy) {}
    
    async SendEmailForOrderConfirmation(data : Object){
        return this.mailClient.send('orderMail', data);
    }
}
