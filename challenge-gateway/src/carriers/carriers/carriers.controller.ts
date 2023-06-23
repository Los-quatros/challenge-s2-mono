import { Controller, Get, Param, Post } from '@nestjs/common';
import { CarriersService } from './carriers.service';

@Controller('carriers')
export class CarriersController {
    constructor(private readonly carriersService : CarriersService){}
    @Get('/:id')
    async GetCarrierById(@Param() id : string) {
        return this.carriersService.GetCarrierById(id);
    }
    @Get()
    async GetAllCarriers() {
        return this.carriersService.GetAllCarriers();
    }
}
