import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SellersService {
    constructor(@Inject('SELLERS_SERVICE') private readonly sellersProxy: ClientProxy) {
    }

    async getSellers() {
        return await lastValueFrom(this.sellersProxy.send('getSellers', {}));
    }

    async getSeller(id: string) {
        return await lastValueFrom(this.sellersProxy.send('getSeller', {id}));
    }

    async updateSeller(id: string, updateSellerDto: any) {
        return await lastValueFrom(this.sellersProxy.send('updateSeller', {id, updateSellerDto}));
    }
    
    
    async createProduct(createProductDto: any) {
        return await lastValueFrom(this.sellersProxy.send('createProduct', createProductDto));
    }
}
