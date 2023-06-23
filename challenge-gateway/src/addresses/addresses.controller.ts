import { Controller, Get, Param, Delete, Patch, Post, Body } from '@nestjs/common';
import { Address } from 'src/orders/models/ordersResponseDto';
import { AddressesService } from './addresses.service';
import { AddressResponseDto } from './models/AddressResponseDto';
import { ChangeAddressDto } from './models/ChangeAddressDto';
import { CreateAddressDto } from './models/CreateAddressDto';

@Controller('addresses')
export class AddressesController {
    constructor(private addressesService: AddressesService) {}
    
    @Post()
    async CreateAddress(@Body() createAddressDto : CreateAddressDto) {
        return this.addressesService.CreateAddress(createAddressDto);
    }
    @Get('/users/:id')
    async GetUserAddresses(@Param() id : string) {
        return this.addressesService.GetUserAddresses(id);
    }
    @Patch('/:id')
    async DeleteAddress(@Param() id: string) {
        return this.addressesService.DeleteAddress(id);
    }

    @Patch('/update/:id')
    async ChangeAddress(@Body() changeAddressDto : ChangeAddressDto, @Param() idAddress) {
        return this.addressesService.ChangeAddress(idAddress,changeAddressDto);
    }

    @Get('/:id')
    async GetAddressByid(@Param() idAddress : string) : Promise<AddressResponseDto> {
        return this.addressesService.GetAddressById(idAddress);
    }

}
