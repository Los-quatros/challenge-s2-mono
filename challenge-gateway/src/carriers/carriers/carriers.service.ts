import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Carrier } from 'src/orders/models/ordersResponseDto';

@Injectable()
export class CarriersService {
  constructor(
    @Inject('CARRIERS_SERVICE') private readonly carriersProxy: ClientProxy,
  ) {}

  async GetCarrierById(id: string): Promise<any> {
    return this.carriersProxy.send('GetCarrier', { id });
  }

  async GetAllCarriers(): Promise<any> {
    return this.carriersProxy.send('GetAllCarriers', {});
  }

  async GetAllCarriersForAdmin(): Promise<any> {
    return this.carriersProxy.send('GetAllCarriersForAdmin', {});
  }

  async CreateCarrier(carrierDto: any): Promise<Carrier> {
    return await lastValueFrom(
      this.carriersProxy.send('CreateCarrier', carrierDto),
    );
  }

  async UpdateCarrier(id: string, carrierDto: any): Promise<Carrier> {
    return await lastValueFrom(
      this.carriersProxy.send('UpdateCarrier', { ...carrierDto, id }),
    );
  }
}
