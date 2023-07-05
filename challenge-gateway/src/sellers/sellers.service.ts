import { MailService } from './../mail/mail.service';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/orders/models/ordersResponseDto';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class SellersService {
  constructor(
    @Inject('SELLERS_SERVICE') private readonly sellersProxy: ClientProxy,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  async getSellers() {
    return await lastValueFrom(this.sellersProxy.send('getSellers', {}));
  }

  async getSeller(id: string) {
    return await lastValueFrom(this.sellersProxy.send('getSeller', { id }));
  }

  async updateSeller(id: string, updateSellerDto: any) {
    return await lastValueFrom(
      this.sellersProxy.send('updateSeller', { id, updateSellerDto }),
    );
  }

  async createProduct(createProductDto: any) {
    return await lastValueFrom(
      this.sellersProxy.send('createProduct', createProductDto),
    );
  }

  async activateSeller(id: string) {
    try {
      const seller = await lastValueFrom(
        this.sellersProxy.send('activeSeller', id),
      );
      const user: any = await this.usersService.getUserBySellerId(id);
      if (user.error) {
        throw new BadRequestException(user.error);
      }
      await this.mailService.sendMailBecomeSellerAccepted(user.email);
      return seller;
    } catch (error) {
      throw error;
    }
  }

  async deactivateSeller(id: string) {
    try {
      const seller = await lastValueFrom(
        this.sellersProxy.send('refuseSeller', id),
      );
      const user: any = await this.usersService.getUserBySellerId(id);
      if (user.error) {
        throw new BadRequestException(user.error);
      }
      await this.mailService.sendMailBecomeSellerRefused(user.email);
      return seller;
    } catch (error) {
      throw error;
    }
  }

  async getMySales(id: string) {
    const products: Array<Product> = await lastValueFrom(
      await this.productsService.GetSellerProducts(id),
    );
    const productIds: Array<string> = products.map(
      (product: Product) => product.id,
    );
    return this.ordersService.GetOrderProductsByProductIds(productIds);
  }

  async deleteSeller(id: string) {
    await lastValueFrom(this.sellersProxy.send('delete-seller', id));
  }
}
