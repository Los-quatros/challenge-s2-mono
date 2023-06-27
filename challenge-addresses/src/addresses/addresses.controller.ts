import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AddressesService } from './addresses.service';
import { Address } from './entity/address.entity';
import { ChangeAddressDto } from './models/ChangeAddressDto';
import { CreateAddressDto } from './models/CreateAddressDto';

@Controller('addresses')
export class AddressesController {
    constructor(private addressesService: AddressesService) {}

    @EventPattern("CreateAddress")
    async CreateAddress(@Payload() createAddressDto : CreateAddressDto) {
        return this.addressesService.CreateAddress(createAddressDto['data']);   
    }

    @EventPattern("GetAddressById")
    async GetAddressById(@Payload() addressId : string) : Promise<Address>{
        return this.addressesService.GetAddressById(addressId['idAddress']);
    }

    @EventPattern("GetUserAddresses")
    async GetUserAddresses(@Payload() idUser : string) : Promise<Array<Address>> {
        return this.addressesService.GetUserAddresses(idUser['id']);
    }
    @EventPattern("DeleteAddress")
    async DeleteAddressById(@Payload() idAddress : string) {
        return this.addressesService.DeleteAddressById(idAddress['id']);
    }

    @EventPattern("ChangeAddress")
    async ChangeAddress(@Payload() data: ChangeAddressDto, @Payload() idAddress : string) {
        return this.addressesService.ChangeAddress(data['data'], idAddress['idAddress']);
    }

}
