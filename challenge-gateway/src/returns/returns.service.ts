import { Inject, Injectable, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom, of, pipe } from 'rxjs';
import { AddressesService } from 'src/addresses/addresses.service';
import { CarriersService } from 'src/carriers/carriers/carriers.service';
import {
  Address,
  Carrier,
  OrderProductDto,
  OrderResponseDto,
} from 'src/orders/models/ordersResponseDto';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import {
  CreateOrderProductForReturnDto,
  CreateReturnDto,
} from './models/CreateReturnDto';
import { ReturnsResponseDto, UserDto } from './models/ReturnsResponseDto';

@Injectable()
export class ReturnsService {
  constructor(
    @Inject('RETURNS_SERVICE') private readonly returnsProxy: ClientProxy,
    private readonly ordersService: OrdersService,
    private readonly addressesService: AddressesService,
    private readonly carriersService: CarriersService,
    private readonly productService: ProductsService,
    private readonly usersService: UsersService
  ) {}

  async CreateReturn(returnDto: CreateReturnDto, userId: string) {
    const result = await lastValueFrom(
      this.returnsProxy.send('CreateReturn', { retrunDto: returnDto, userId }),
    );
    if (!result.error) {
      returnDto['orderProducts'].forEach(
        async (elm: CreateOrderProductForReturnDto) => {
          await this.ordersService.UpdateNbItemReturnedForOrderProduct(
            elm.id_product,
            elm.nbItemReturned,
          );
        },
      );
    }
    return result;
  }

  async ModerateReturn(decision: boolean, returnId: string) {
    return this.returnsProxy.send('AcceptOrDeclineReturn', {
      decision,
      returnId,
    });
  }

  async GetAll(): Promise<Array<ReturnsResponseDto>> {
    const result: Array<any> = await lastValueFrom(
      this.returnsProxy.send('GetAllReturns', {}),
    );
    return this.AssignProductAddressAndCarrierToReturn(result);
  }

  async GetAllByUser(id: string): Promise<Array<ReturnsResponseDto>> {
    const result: Array<any> = await lastValueFrom(
      this.returnsProxy.send('GetReturnsByUser', { id }),
    );
    return this.AssignProductAddressAndCarrierToReturn(result);
  }

  // TODO : A TESTER
  async GetAllBySales(sellerId: string): Promise<Array<ReturnsResponseDto>> {
    const products: Array<any> = await lastValueFrom(
      await this.productService.GetSellerProducts(sellerId),
    );
    const productsIds: Array<string> = products.map((elm) => {
      return elm['id'];
    });
    const orderProducts: Array<string> =
      await this.ordersService.GetOrderProductsIdsByProductIds(productsIds);
    const result: Array<any> = await lastValueFrom(
      this.returnsProxy.send('GetReturnsWithSales', { orderProducts }),
    );

    return this.AssignProductAddressAndCarrierToReturn(result);
  }

  async AssignProductAddressAndCarrierToReturn(
    returns: Array<any>,
  ): Promise<Array<ReturnsResponseDto>> {
    const response = Promise.all(
      returns.map(async (elm) => {
        const listOrderProducts: Array<OrderProductDto> = [];
        for (let idOrderProduct of elm['orderProducts']) {
          const orderProduct: any = await lastValueFrom(
            await this.ordersService.GetOrderProduct(idOrderProduct),
          );
          const orderProductWithProduct =
            await this.ordersService.AssignProductToOrderProduct(orderProduct);
          listOrderProducts.push(orderProductWithProduct);
        }

        const orderConcerned = await lastValueFrom(
          await this.ordersService.GetOrder(listOrderProducts[0].orderId),
        );
        const carrier: Carrier = await lastValueFrom(
          await this.carriersService.GetCarrierById(orderConcerned['carrier']),
        );
        const address: Address = await lastValueFrom(
          await this.addressesService.GetAddressById(orderConcerned['address']),
        );
        const user : UserDto = await lastValueFrom(
            await this.usersService.getUser(elm['userId'])
        );
        return new ReturnsResponseDto(
          elm['id'],
          elm['reason'],
          listOrderProducts,
          elm['status'],
          carrier,
          address,
          elm['createdAt'],
          user
        );
      }),
    );
    return response;
  }
}
