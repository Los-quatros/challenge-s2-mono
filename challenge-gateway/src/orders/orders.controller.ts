import {
  Controller,
  Post,
  Get,
  Param,
  ValidationPipe,
  Body,
  Patch,
} from '@nestjs/common';
import { CreateOrderDto } from './models/CreateOrderDto';
import { OrderResponseDto } from './models/ordersResponseDto';
import { OrdersService } from './orders.service';
import {
  AuthenticationRequired,
  HasRole,
} from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Post()
  async Post(@Body(new ValidationPipe()) createOrderDto: CreateOrderDto) {
    return this.ordersService.CreateOrder(createOrderDto);
  }

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Get('/users/:id')
  async Get(@Param() userId: string): Promise<Array<OrderResponseDto>> {
    return await this.ordersService.GetOrdersByUser(userId);
  }

  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Get()
  async GetOrders(): Promise<any> {
    return this.ordersService.GetOrders();
  }

  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Patch('/:id/delivery')
  async ManageOrderDelivery(
    @Body() decision: boolean,
    @Param() idOrder: string,
  ) {
    return this.ordersService.ModerateOrderDelivery(
      decision['decision'],
      idOrder['id'],
    );
  }
}
