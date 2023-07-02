import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENTS_SERVICE') private readonly paymentProxy: ClientProxy,
  ) {}

  async createCheckoutSession() {
    return await lastValueFrom(
      this.paymentProxy.send('create-stripe-session', {}),
    );
  }
}
