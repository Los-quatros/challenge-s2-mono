import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CarriersService {
    constructor(@Inject('CARRIERS_SERVICE') private readonly carriersProxy: ClientProxy) {}

    async GetCarrierById(id : string) : Promise<any> {
        return this.carriersProxy.send('GetCarrier', {id});
    }

    async GetAllCarriers() : Promise<any> {
        return this.carriersProxy.send('GetAllCarriers', {});
    }
}
