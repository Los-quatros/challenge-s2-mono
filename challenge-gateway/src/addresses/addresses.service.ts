import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AddressesService {
    constructor(@Inject('ADDRESSES_SERVICE') private readonly productsProxy: ClientProxy) {}
    
}
