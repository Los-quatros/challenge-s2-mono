import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CarriersService {
    constructor(@Inject('CARRIERS_SERVICE') private readonly carriersProxy: ClientProxy) {}
    
    async getCarrierByid(id: string) {
        return await lastValueFrom(this.carriersProxy.send('GetCarrierForOrder', id));
    }
   
}
