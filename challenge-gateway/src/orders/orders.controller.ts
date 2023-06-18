import { Controller, Post, Get, Param } from '@nestjs/common';
import { orderResponseDto } from './models/ordersResponseDto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post()
    async Post(createOrders){
        
    }
    @Get("/users/:id")
    async Get(@Param() userId : string) : Promise<Array<orderResponseDto>> {
        return this.ordersService.GetOrdersByUser(userId);
    }


}
