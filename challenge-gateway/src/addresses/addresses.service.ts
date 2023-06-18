import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AddressesService {
    constructor(@Inject('ADDRESSES_SERVICE') private readonly addressesProxy: ClientProxy) {}

    async GetUserAddresses(id : string) {
        this.addressesProxy.send('GetUserAddresses', {id});
    }
}
