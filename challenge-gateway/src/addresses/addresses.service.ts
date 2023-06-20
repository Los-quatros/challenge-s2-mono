import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ChangeAddressDto } from './models/ChangeAddressDto';

@Injectable()
export class AddressesService {
    constructor(@Inject('ADDRESSES_SERVICE') private readonly addressesProxy: ClientProxy) {}

    async CreateAddress(id : string) {
       return this.addressesProxy.send('CreateAddress', {id})
    }

    async GetUserAddresses(id : string) {
        return this.addressesProxy.send('GetUserAddresses', {id});
    }

    async DeleteAddress(id : string) {
        return this.addressesProxy.send('DeleteAddress', {id});
    }

    async ChangeAddress(data : ChangeAddressDto) {
        return this.addressesProxy.send('ChangeAddress', {data});
    }
}
