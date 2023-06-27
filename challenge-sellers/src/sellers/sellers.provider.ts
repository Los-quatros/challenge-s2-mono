import { Connection } from 'mongoose';
import { SellerSchema } from '../schema/sellers.model';

export const sellerProviders = [
  {
    provide: 'SELLER_MODEL',
    useFactory: (connection: Connection) => connection.model('Seller', SellerSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
