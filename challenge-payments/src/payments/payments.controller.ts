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
    Req
  } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51IUL0ZLnExjIVJcojZq1EQ82kFJ7i5TN13Sh98VaK9yLX8R75ZOPVt08535LQFRTzW9hsNZDg9reWLhESeicdcTu00ak7gVZyY', {
    apiVersion: '2022-11-15',
  });

  
@Controller('/payments')


export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
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
      success_url: 'https://example.com/success', //TODO replace with the good URL
      cancel_url: 'https://example.com/cancel', //TODO replace with the good URL
    });

    return { sessionId: session.id };
  }
}