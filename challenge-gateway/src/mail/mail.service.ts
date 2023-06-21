import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MailService {
  constructor(
    @Inject('MAIL_SERVICE') private readonly mailProxy: ClientProxy,
  ) {}

  async sendMailBecomeSeller(email: string): Promise<Object> {
    return await lastValueFrom(this.mailProxy.send('becomeSellerMail', email));
  }

  async sendMailBecomeSellerAccepted(email: string): Promise<Object> {
    return await lastValueFrom(
      this.mailProxy.send('becomeSellerAcceptedMail', email),
    );
  }

  async sendMailBecomeSellerRefused(email: string): Promise<Object> {
    return await lastValueFrom(
      this.mailProxy.send('becomeSellerRefusedMail', email),
    );
  }

  async sendMailRegister(email: string): Promise<Object> {
    return await lastValueFrom(this.mailProxy.send('registerMail', email));
  }

  async sendMailOrder(data: Object): Promise<Object> {
    return await lastValueFrom(this.mailProxy.send('orderMail', data));
  }

  async sendMailBecomeSellerAdvert(email: string): Promise<Object> {
    return await lastValueFrom(
      this.mailProxy.send('becomeSellerAdvertMail', email),
    );
  }

  async sendMailRequestPassword(email: string, token: string): Promise<Object> {
    return await lastValueFrom(
      this.mailProxy.send('requestResetPassword', { email, token }),
    );
  }
}
