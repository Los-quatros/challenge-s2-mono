import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { OrderResponseDto } from 'src/orders/models/ordersResponseDto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENTS_SERVICE') private readonly paymentProxy: ClientProxy,
  ) {}

  async createCheckoutSession(data : any) {
    return  await lastValueFrom(
      this.paymentProxy.send('create-stripe-session', { data}),
    );
  }
}
