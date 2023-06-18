import { Controller, Post, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post()
    async Post(createOrders){
        
    }
    @Get("/users/:id")
    async Get(@Param() userId : string) {
        return this.ordersService.GetOrdersByUser(userId);
    }


}
