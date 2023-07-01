import { Controller, Get, Param, Post } from '@nestjs/common';
import { CarriersService } from './carriers.service';
import {
    AuthenticationRequired,
    HasRole,
  } from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';

@Controller('carriers')
export class CarriersController {
    constructor(private readonly carriersService : CarriersService){}

    @AuthenticationRequired()
    @HasRole(Role.USER)
    @Get('/:id')
    async GetCarrierById(@Param() id : string) {
        return this.carriersService.GetCarrierById(id);
    }

    @AuthenticationRequired()
    @HasRole(Role.USER)
    @Get()
    async GetAllCarriers() {
        return this.carriersService.GetAllCarriers();
    }
}
