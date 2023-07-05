import Stripe from 'stripe';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { ProductUpdate, UpdateProductsQuantityDto } from 'src/products/models/UpdateProductsQuantity';
import { UsersService } from 'src/users/users.service';
import { MailsService } from 'src/emails/email.service';




const stripe = new Stripe('sk_test_51IUL0ZLnExjIVJcojZq1EQ82kFJ7i5TN13Sh98VaK9yLX8R75ZOPVt08535LQFRTzW9hsNZDg9reWLhESeicdcTu00ak7gVZyY', {
    apiVersion: '2022-11-15',
  });

@Injectable()
export class PaymentsService {
  constructor(private ordersService: OrdersService, private productsService: ProductsService, private usersService : UsersService, private mailsService : MailsService) {}

  
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
        success_url: `https://localhost:4000/payments/success/${result.id}`,
        cancel_url: 'https://localhost:4000/payments/cancel',
      });
    
    let test = this.UpdatesAfterPaymentValidation(data);
    return { sessionId: session.id, result };
  }

  async UpdatesAfterPaymentValidation(idOrder : string){
    // mark order as paid
    await this.ordersService.validateOrder(idOrder);
    let orderProducts : Array<any> = [];
    try {
      orderProducts = await this.ordersService.getProductsOrder(idOrder);
    }catch(error){
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // update products quantity
      // build update products quantity model
      const modelForUpdate : Array<ProductUpdate> = orderProducts.map(orderProduct => {
          return new ProductUpdate(orderProduct['product_id'], orderProduct['quantity']);
      });
    this.productsService.UpdateStockProduct(new UpdateProductsQuantityDto(modelForUpdate));

    // build object for email template and trigger event to send the email
      // get the user id from the orderId, and send request to userService to retreive email of the user (get user by id)
      const userIdAndTotal : string = await this.ordersService.getUserIdAndTotalFromOrderId(idOrder);
      const email : string = await this.usersService.getUserEmail(userIdAndTotal['userId']);
      const orderTotal : number = userIdAndTotal['total'];
      // get every products with the id_product in orderProduct and build an object with the quantity, the product name, product price
      const products : Array<Object> = await Promise.all(orderProducts.map(async orderProduct => {
        const product  = await this.productsService.getProductById(orderProduct['product_id']);
        return {
          label : product['label'],
          price : product['price'],
          quantity : orderProduct['product_id']
        }
      }));
      // send email to confirm order
      this.mailsService.SendEmailForOrderConfirmation({
        orders : {
          products: products,
          total : orderTotal  
        },
        email : email
      });
      
      // build the objetc and send it 
      //this.mailsService.SendEmailForOrderConfirmation();
    return ;
  }

}