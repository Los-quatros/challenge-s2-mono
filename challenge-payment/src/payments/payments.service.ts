import Stripe from 'stripe';
import { All, Injectable,Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { CarriersService } from '../carriers/carriers.service';




const stripe = new Stripe('sk_test_51IUL0ZLnExjIVJcojZq1EQ82kFJ7i5TN13Sh98VaK9yLX8R75ZOPVt08535LQFRTzW9hsNZDg9reWLhESeicdcTu00ak7gVZyY', {
    apiVersion: '2022-11-15',
  });

@Injectable()
export class PaymentsService {
  constructor(private ordersService: OrdersService, private productsService: ProductsService, private carriersService: CarriersService ) {}

  
  async createCheckoutSession(data : any) {
    const result = data['data'][0]
    const orderCarrier = result.carrier
    const items = result.products
    const productsForStripe = []
  
    for (let item of items) {
      productsForStripe.push({
        label: item.product.label,
        price: item.product.price,
        quantity: item.quantity
      });
    }
    const lineItems = productsForStripe.map(productForStripe => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: productForStripe.label,
        },
        unit_amount: parseInt(productForStripe.price)*100,
      },
      quantity: productForStripe.quantity,
    }));

    const carrierLineItem = {
      price_data: {
        currency: 'eur',
        product_data: {
          name: orderCarrier.name,
        },
        unit_amount: parseInt(orderCarrier.fees) * 100, 
      },
      quantity: 1,
    };
    lineItems.push(carrierLineItem);
    

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://localhost:4000/payments/success',
        cancel_url: 'https://localhost:4000/payments/cancel',
      });
    

    return { sessionId: session.id, result };
    
  }

}