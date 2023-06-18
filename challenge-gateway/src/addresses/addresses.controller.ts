import { Controller, Get } from '@nestjs/common';
import { AddressesService } from './addresses.service';

@Controller('addresses')
export class AddressesController {
    constructor(private addressesService: AddressesService) {}

}
