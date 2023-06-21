import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CarriersService } from './carriers.service';
import { CarrierDto } from './models/carrier.dto';

@Controller('carriers')
export class CarriersController {
    constructor(private carriersService: CarriersService) {}

    @EventPattern('GetCarrier')
    async GetCarrierById(@Payload() id : string) : Promise<CarrierDto> {
        return this.carriersService.GetCarrierByid(id);
    }
}
