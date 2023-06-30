import { Controller, Post, Get, Param, ValidationPipe, Body, Patch } from '@nestjs/common';
import { CreateOrderDto } from './models/CreateOrderDto';
import { OrderResponseDto } from './models/ordersResponseDto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post()
    async Post(@Body(new ValidationPipe()) createOrderDto : CreateOrderDto){
        return this.ordersService.CreateOrder(createOrderDto);
    }

    // for a client
    @Get("/users/:id")                                                              
    async Get(@Param() userId : string) : Promise<Array<OrderResponseDto>> {
        return await this.ordersService.GetOrdersByUser(userId);
    }

    // for admin
    @Get()
    async GetOrders() : Promise<any> {
        return this.ordersService.GetOrders();
    }

    // TODO : SET ISDELIVERED ON TRUE
    @Patch()
    async ModerateOrder(){
        return this.ordersService
    }

}
