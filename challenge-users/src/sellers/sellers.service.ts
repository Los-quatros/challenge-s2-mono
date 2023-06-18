import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SellersService {
    constructor(@Inject('SELLERS_SERVICE') private readonly sellersProxy: ClientProxy) { }

    async checkIfSellerIsAvailable(id: string) {
        return await lastValueFrom(this.sellersProxy.send('checkIfSellerIsActif', id));
    }

    async createSellerAccount({user, userId}: any) {
        return await lastValueFrom(this.sellersProxy.send('createSellerAccount', {user, userId}));
    }

}
