import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReturnDto } from './models/CreateReturnDto';
import { ReturnsResponseDto } from './models/ReturnsResponseDto';
import { ReturnsService } from './returns.service';

@Controller('returns')
export class ReturnsController {
    constructor(private readonly returnsService : ReturnsService){}
    
    @Post('/users/:id')
    async CreateReturn(@Body() createReturnDto : CreateReturnDto, @Param() userId : string){
        return this.returnsService.CreateReturn(createReturnDto, userId);
    }

    @Post('/:id/moderate')
    async ModerateReturnByAdmin(@Body() decision : boolean, @Param() idReturn : string){
        return this.returnsService.ModerateReturn(decision['decision'], idReturn['id']);
    }

    // admin / auth
    @Get()
    async GetAllReturns() : Promise<Array<ReturnsResponseDto>>{
        return await this.returnsService.GetAll();
    }

    @Get('/users/:id')
    async GetUserReturns(@Param() id : string) : Promise<Array<ReturnsResponseDto>>{
        return await this.returnsService.GetAllByUser(id['id']);
    }

    @Get('sellers/:id')
    async GetReturnsBySellerSales(@Param() id : string){
        return await this.returnsService.GetAllBySales(id['id']);
    }
}
