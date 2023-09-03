import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ProductUpdate,
  UpdateProductsQuantityDto,
} from 'src/products/models/UpdateProductsQuantity';

import { MailsService } from '../emails/email.service';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import Stripe from 'stripe';
import { UsersService } from '../users/users.service';

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY,
  {
    apiVersion: '2022-11-15',
  },
);

@Injectable()
export class PaymentsService {
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private usersService: UsersService,
    private mailsService: MailsService,
  ) {}

  async createCheckoutSession(data: any) {
   
    const result = data;
    const orderCarrier = result.carrier;
    const items = result.products;
    const productsForStripe = [];

    for (const item of items) {
      productsForStripe.push({
        label: item.product.label,
        price: item.product.price,
        quantity: item.quantity,
      });
    }
    const lineItems = productsForStripe.map((productForStripe) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: productForStripe.label,
        },
        unit_amount: parseInt(productForStripe.price) * 100,
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
      success_url: `${process.env.STRIPE_URL_FRONT}/payments/success/${result.orderId}`,
      cancel_url: `${process.env.STRIPE_URL_FRONT}/payments/cancel`,
    });

    console.log(session, "session");
    console.log(`${process.env.STRIPE_URL_FRONT}/payments/success/${result.orderId}`);
    return { sessionId: session.id, result };
  }

  async UpdatesAfterPaymentValidation(idOrder: string) {
    await this.ordersService.validateOrder(idOrder['idOrder']);
    let orderProducts: Array<any> = [];
    try {
      orderProducts = await this.ordersService.getProductsOrder(
        idOrder['idOrder'],
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const modelForUpdate: Array<ProductUpdate> = orderProducts.map(
      (orderProduct) => {
        return new ProductUpdate(
          orderProduct['product_id'],
          orderProduct['quantity'],
        );
      },
    );
    this.productsService.UpdateStockProduct(
      new UpdateProductsQuantityDto(modelForUpdate),
    );

    const userIdAndTotal: string =
      await this.ordersService.getUserIdAndTotalFromOrderId(idOrder['idOrder']);
    const email: string = await this.usersService.getUserEmail(
      userIdAndTotal['userId'],
    );
    const orderTotal: number = userIdAndTotal['total'];
    const products: Array<object> = await Promise.all(
      orderProducts.map(async (orderProduct) => {
        const product = await this.productsService.getProductById(
          orderProduct['product_id'],
        );
        return {
          label: product['label'],
          price: product['price'],
          quantity: orderProduct['product_id'],
        };
      }),
    );
    await this.mailsService.SendEmailForOrderConfirmation({
      order: {
        products: products,
        total: orderTotal,
      },
      email: email,
    });

    return;
  }
}
