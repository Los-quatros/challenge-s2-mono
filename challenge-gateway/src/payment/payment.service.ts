import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { OrderResponseDto } from 'src/orders/models/ordersResponseDto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENTS_SERVICE') private readonly paymentProxy: ClientProxy,
  ) {}

  async createCheckoutSession(data : Array<OrderResponseDto>) {
    return await lastValueFrom(
      this.paymentProxy.send('create-stripe-session', { data}),
    );
    
  }

  async paymentValidated(idOrder : string){
    return this.paymentProxy.send('payment-success', idOrder);
  }
}
