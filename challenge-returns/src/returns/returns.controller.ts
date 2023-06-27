import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateReturnModel } from 'src/models/CreateReturnModel';
import { ReturnsService } from './returns.service';

@Controller('returns')
export class ReturnsController {
    constructor(private readonly returnsService : ReturnsService){}
    @EventPattern('CreateReturn')
    async CreateReturn(@Payload() createReturnModel : CreateReturnModel) {
        return this.returnsService.CretaeReturn(createReturnModel);
    }
}
