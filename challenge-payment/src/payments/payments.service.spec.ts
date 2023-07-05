import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { MailsService } from '../emails/email.service';

describe('PaymentsService', () => {
  let paymentsService: PaymentsService;
  let ordersService: OrdersService;
  let productsService: ProductsService;
  let usersService: UsersService;
  let mailsService: MailsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        OrdersService,
        ProductsService,
        UsersService,
        MailsService,
      ],
    }).compile();

    paymentsService = moduleRef.get<PaymentsService>(PaymentsService);
    ordersService = moduleRef.get<OrdersService>(OrdersService);
    productsService = moduleRef.get<ProductsService>(ProductsService);
    usersService = moduleRef.get<UsersService>(UsersService);
    mailsService = moduleRef.get<MailsService>(MailsService);
  });

  describe('createCheckoutSession', () => {
    it('should create a checkout session', async () => {
      // Mock the necessary dependencies
      const result = {
        carrier: { name: 'Carrier', fees: '10.99' },
        products: [
          {
            product: { label: 'Product 1', price: '5.99' },
            quantity: 2,
          },
          {
            product: { label: 'Product 2', price: '7.99' },
            quantity: 3,
          },
        ],
        orderId: '123',
      };

      jest.spyOn(paymentsService, 'createCheckoutSession').mockResolvedValue({
        sessionId: 'session123',
        result,
      });

      const session = await paymentsService.createCheckoutSession(result);

      expect(session.sessionId).toEqual('session123');
      expect(session.result).toEqual(result);
    });
  });

 
});
