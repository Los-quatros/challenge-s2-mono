import Stripe from 'stripe';
import { All, Injectable,Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersService } from '../orders/orders.service';



const stripe = new Stripe('sk_test_51IUL0ZLnExjIVJcojZq1EQ82kFJ7i5TN13Sh98VaK9yLX8R75ZOPVt08535LQFRTzW9hsNZDg9reWLhESeicdcTu00ak7gVZyY', {
    apiVersion: '2022-11-15',
  });

@Injectable()
export class PaymentsService {
  constructor(private ordersService: OrdersService) {}

  
  async createCheckoutSession(data : any) {
    let products = await this.ordersService.getProductsOrder(data['data'].id);
    let productIds = products.map(product => product.product_id);


    console.log(productIds)

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'item1',
              },
              unit_amount: 100,
            },
            quantity: 1,
          },
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'item1',
              },
              unit_amount: 100,
            },
            quantity: 1,
          },
          
        ],
        mode: 'payment',
        success_url: 'https://localhost:4000/payments/success',
        cancel_url: 'https://localhost:4000/payments/cancel',
      });
  
      return { sessionId: session.id };
    
  }

}