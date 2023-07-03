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
    let carrier = await this.carriersService.getCarrierByid(data['data'].carrier);

    let products = await this.ordersService.getProductsOrder(data['data'].id);
    let productIds = products.map(product => product.product_id);
    
    let orderProducts = [];
    for (let productId of productIds) {
      let product = await this.productsService.getProductById(productId);
      orderProducts.push({
        label: product.label,
        price: product.price,
        quantity: products.find(p => p.product_id === productId).quantity
      });
    }

    
    const lineItems = orderProducts.map(orderProduct => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: orderProduct.label,
        },
        unit_amount: parseInt(orderProduct.price)*100,
      },
      quantity: orderProduct.quantity,
    }));

    const carrierLineItem = {
      price_data: {
        currency: 'eur',
        product_data: {
          name: carrier.name,
        },
        unit_amount: parseInt(carrier.fees) * 100, 
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
     
    return { sessionId: session.id };
    
  }

}