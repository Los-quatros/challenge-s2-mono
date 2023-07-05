import {
    Body,
    Controller,
    Post,
    Res,
    Inject
  } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';

  
@Controller('/payments')

export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @EventPattern('create-stripe-session')
  async createCheckoutSession(@Payload() data :any) {
    const session = await this.paymentsService.createCheckoutSession(data['data']);
    return { data : session };

  }

  @EventPattern('payment-success')
  async handlePaymentSuccess(idOrder: string) { 
    this.paymentsService.UpdatesAfterPaymentValidation(idOrder);
    return 'payment successed';
  }

  @EventPattern('payment-failed')
  handlePaymentCancel(@Res() res: Response) {
    return 'payment failed please retry';
  }
}