import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Post,
  Body,
} from '@nestjs/common';
import { Address } from 'src/orders/models/ordersResponseDto';
import { AddressesService } from './addresses.service';
import { AddressResponseDto } from './models/AddressResponseDto';
import { ChangeAddressDto } from './models/ChangeAddressDto';
import { CreateAddressDto } from './models/CreateAddressDto';
import {
  AuthenticationRequired,
  HasRole,
} from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';

@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Post()
  async CreateAddress(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.CreateAddress(createAddressDto);
  }

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Get('/users/:id')
  async GetUserAddresses(@Param() id: string) {
    return this.addressesService.GetUserAddresses(id);
  }

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Patch('/:id')
  async DeleteAddress(@Param() id: string) {
    return this.addressesService.DeleteAddress(id);
  }

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Patch('/update/:id')
  async ChangeAddress(
    @Body() changeAddressDto: ChangeAddressDto,
    @Param() idAddress,
  ) {
    return this.addressesService.ChangeAddress(idAddress, changeAddressDto);
  }

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Get('/:id')
  async GetAddressByid(
    @Param() idAddress: string,
  ): Promise<AddressResponseDto> {
    return this.addressesService.GetAddressById(idAddress);
  }
}
