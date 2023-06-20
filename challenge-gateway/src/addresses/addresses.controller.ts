import { Controller, Get, Param, Delete, Patch, Post, Body } from '@nestjs/common';
import { Address } from 'src/orders/models/ordersResponseDto';
import { AddressesService } from './addresses.service';
import { ChangeAddressDto } from './models/ChangeAddressDto';
import { CreateAddressDto } from './models/CreateAddressDto';

@Controller('addresses')
export class AddressesController {
    constructor(private addressesService: AddressesService) {}
    
    @Post('/:id')
    async CreateAddress(@Param() createAddressDto : CreateAddressDto) {
        return this.addressesService.CreateAddress(createAddressDto);
    }
    @Get('/users/:id')
    async GetUserAddresses(@Param() id : string) {
        return this.addressesService.GetUserAddresses(id);
    }
    @Delete('/:id')
    async DeleteAddress(@Param() id: string) {
        return this.addressesService.DeleteAddress(id);
    }

    @Post()
    async ChangeAddress(@Body() changeAddressDto : ChangeAddressDto) {
        return this.addressesService.ChangeAddress(changeAddressDto);
    }

}
