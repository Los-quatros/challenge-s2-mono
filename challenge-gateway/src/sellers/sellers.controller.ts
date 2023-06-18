import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

    @AuthenticationRequired()
    @HasRole(Role.SELLER)
    @Get(':id')
    async getSeller(@Param('id') id: string) {
        return await this.sellersService.getSeller(id);
    }

    @Patch(':id')
    async updateSeller(@Param('id') id: string, @Body() updateSellerDto: any) {
        return await this.sellersService.updateSeller(id, updateSellerDto);
    }

    @Post('/createProduct')
    async createProduct(
        @Body() createProductDto: any
    ) {
        return await this.sellersService.createProduct(createProductDto);
    }


}
