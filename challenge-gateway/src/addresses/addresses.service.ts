import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ChangeAddressDto } from './models/ChangeAddressDto';
import { CreateAddressDto } from './models/CreateAddressDto';

@Injectable()
export class AddressesService {
    constructor(@Inject('ADDRESSES_SERVICE') private readonly addressesProxy: ClientProxy) {}

    async CreateAddress(data : CreateAddressDto) {
       return await this.addressesProxy.send('CreateAddress', {data})
    }

    async GetUserAddresses(id : string) {
        return await this.addressesProxy.send('GetUserAddresses', {id});
    }

    async DeleteAddress(id : string) {
        return await this.addressesProxy.send('DeleteAddress', {id});
    }

    async ChangeAddress(data : ChangeAddressDto) {
        return await this.addressesProxy.send('ChangeAddress', {data});
    }
}
