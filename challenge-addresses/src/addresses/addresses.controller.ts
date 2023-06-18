import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AddressesService } from './addresses.service';
import { Address } from './entity/address.entity';

@Controller('addresses')
export class AddressesController {
    constructor(private addressesService: AddressesService) {}

    @EventPattern("GetAddressById")
    async GetAddressById(@Payload() addressId : string) : Promise<Address>{
        return this.addressesService.GetAddressById(addressId);
    }
}
