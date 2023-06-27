import {
    Body,
    Controller,
    Post,
    Res,
    Inject
  } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';

  
@Controller('/payments')

export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('/checkout')
  async createCheckoutSession(@Body() data: any) {
    
    const session = await this.paymentsService.createCheckoutSession(data);
    return { sessionId: session };

  }

  @Post('/success')
  async handlePaymentSuccess(@Body() data: any) {
    
    return 'payment successed';
  }

  @Post('/cancel')
  handlePaymentCancel(@Res() res: Response) {
  
    return 'payment failed please retry';
  }
}