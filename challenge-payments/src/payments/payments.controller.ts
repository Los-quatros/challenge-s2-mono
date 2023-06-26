import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Param,
    Patch,
    UseGuards,
    UnauthorizedException,
    BadRequestException,
    Req,
    Res
  } from '@nestjs/common';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51IUL0ZLnExjIVJcojZq1EQ82kFJ7i5TN13Sh98VaK9yLX8R75ZOPVt08535LQFRTzW9hsNZDg9reWLhESeicdcTu00ak7gVZyY', {
  apiVersion: '2022-11-15',
});

import { RabbitMQService } from '../rabbitmq/rabbitmq.service';


  
@Controller('/payments')


export class PaymentsController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}
  @Post('/checkout')
  async createCheckoutSession(@Body() data: any) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          //TODO replace with the good data from order
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Product Name',
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://localhost:3000/payments/success',
      cancel_url: 'https://localhost:3000/payments/cancel',
    });

    await this.rabbitMQService.publishSessionIdEvent({ sessionId: session.id });

    return { sessionId: session.id };
  }

  @Post('/success')
  async handlePaymentSuccess(@Body() data: any) {
    
    await this.rabbitMQService.publishPaidEvent({ isPaid: true });
    return 'payment successed';
  }

  @Post('/cancel')
  handlePaymentCancel(@Res() res: Response) {
  
    return 'payment failed please retry';
  }
}