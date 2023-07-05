import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CarriersService } from './carriers.service';
import {
  AuthenticationRequired,
  HasRole,
} from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';
import { Carrier } from 'src/orders/models/ordersResponseDto';

@Controller('carriers')
export class CarriersController {
  constructor(private readonly carriersService: CarriersService) {}

  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Get('/admin')
  async GetAllCarriersForAdmin() {
    return this.carriersService.GetAllCarriersForAdmin();
  }

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Get('/:id')
  async GetCarrierById(@Param() id: string) {
    return this.carriersService.GetCarrierById(id);
  }

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Get()
  async GetAllCarriers() {
    return this.carriersService.GetAllCarriers();
  }

  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Post()
  async CreateCarrier(@Body() carrierDto: any): Promise<Carrier> {
    return await this.carriersService.CreateCarrier(carrierDto);
  }

  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Patch('/:id')
  async UpdateCarrier(
    @Param('id') id: string,
    @Body() carrierDto: any,
  ): Promise<Carrier> {
    return await this.carriersService.UpdateCarrier(id, carrierDto);
  }
}
