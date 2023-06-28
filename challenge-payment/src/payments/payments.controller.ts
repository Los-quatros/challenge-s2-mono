import {
    Body,
    Controller,
    Post,
    Res,
    Inject
  } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';

  
@Controller('/payments')

export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @EventPattern('create-stripe-session')
  async createCheckoutSession() {
    
    const session = await this.paymentsService.createCheckoutSession();
    return { sessionId: session };

  }

  @EventPattern('payment-success')
  async handlePaymentSuccess(@Body() data: any) {
    
    return 'payment successed';
  }

  @EventPattern('payment-failed')
  handlePaymentCancel(@Res() res: Response) {
  
    return 'payment failed please retry';
  }
}