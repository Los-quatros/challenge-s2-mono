import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Returns } from 'src/entity/entity.returns';
import { CreateReturnModel } from 'src/models/CreateReturnModel';
import { Repository } from 'typeorm';

@Injectable()
export class ReturnsService {
    constructor(
        @InjectRepository(Returns)
        private retrunsRepository: Repository<Returns>,
    ) { 
        
     }

    async CretaeReturn(returnModel : CreateReturnModel){
        
    }
}
