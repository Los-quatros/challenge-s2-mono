import { Controller, Get, Param } from '@nestjs/common';
import { Address } from 'src/orders/models/ordersResponseDto';
import { AddressesService } from './addresses.service';

@Controller('addresses')
export class AddressesController {
    constructor(private addressesService: AddressesService) {}
    
    @Get('/users/:id')
    async GetUserAddresses(@Param() id : string) {
        return this.addressesService.GetUserAddresses(id);
    }
}
