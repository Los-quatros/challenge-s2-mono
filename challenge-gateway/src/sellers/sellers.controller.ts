import { Body, Controller, Get, Post } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { AuthenticationRequired, HasRole } from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';

@Controller('sellers')
export class SellersController {

    constructor(readonly sellersService: SellersService) { }
    
    @AuthenticationRequired()
    @HasRole(Role.ADMINISTRATOR)
    @Get()
    async getSellers() {
        return await this.sellersService.getSellers();
    }

    @Post('/createProduct')
    async createProduct(
        @Body() createProductDto: any
    ) {
        return await this.sellersService.createProduct(createProductDto);
    }


}
