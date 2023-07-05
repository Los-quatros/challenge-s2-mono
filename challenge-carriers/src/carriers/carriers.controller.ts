import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CarriersService } from "./carriers.service";
import { Carriers } from "./entity/carriers.entity";
import { CarrierDto } from "./models/carrier.dto";

@Controller("carriers")
export class CarriersController {
  constructor(private carriersService: CarriersService) {}

  @EventPattern("GetCarrier")
  async GetCarrierById(@Payload() id: string): Promise<any> {
    return this.carriersService.GetCarrierByid(id["id"]);
  }

  @EventPattern("GetAllCarriers")
  async GetAllCarriers(): Promise<Array<Carriers>> {
    return this.carriersService.GetAllCarriers();
  }

  @EventPattern("GetCarrierForOrder")
  async GetCarrierByIdForOrder(@Payload() id: string): Promise<any> {
    return this.carriersService.GetCarrierByIdForOrder(id);
  }

  @EventPattern("GetAllCarriersForAdmin")
  async GetAllCarriersForAdmin(): Promise<Array<Carriers>> {
    return this.carriersService.GetAllCarriersForAdmin();
  }

  @EventPattern("CreateCarrier")
  async CreateCarrier(@Payload() carrierDto: CarrierDto): Promise<Carriers> {
    return this.carriersService.CreateCarrier(carrierDto);
  }

  @EventPattern("UpdateCarrier")
  async UpdateCarrier(@Payload() carrierDto: CarrierDto): Promise<Carriers> {
    return this.carriersService.UpdateCarrier(carrierDto);
  }
}
