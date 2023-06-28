import { Body, Controller, Post } from '@nestjs/common';
import { CreateReturnDto } from './models/CreateReturnDto';
import { ReturnsService } from './returns.service';

@Controller('returns')
export class ReturnsController {
    constructor(private readonly returnsService : ReturnsService){}
    
    @Post()
    async test(){
        return this.returnsService.test();
    }

    @Post()
    async CreateReturn(@Body() createReturnDto : CreateReturnDto){
        return this.returnsService.CreateReturn(createReturnDto);
    }
}
