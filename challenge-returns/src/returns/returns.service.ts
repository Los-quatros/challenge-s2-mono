import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Returns } from 'src/entity/entity.returns';
import { CreateReturnModel } from 'src/models/CreateReturnModel';

import { ReturnsResponseDto } from 'src/models/ReturnsResponseDto';
import { ArrayContainedBy, In, Repository } from 'typeorm';

@Injectable()
export class ReturnsService {
    constructor(
        @InjectRepository(Returns)
        private returnsRepository: Repository<Returns>,
    ) { 
        
     }

    async Cretae(returnModel : CreateReturnModel, userId : string){
        try {
            const orderProductsIdsConcatened : string = returnModel['orderProducts'].map(elm => {
                return elm.id_product;
            }).join(';');
            const returnToPersist : Returns = new Returns();
            returnToPersist.orderProducts = orderProductsIdsConcatened;
            returnToPersist.reason = returnModel['reason'];
            returnToPersist.total = returnModel['total'];
            returnToPersist.userId = userId['id'];

            return this.returnsRepository.save(returnToPersist);

        }catch(error){
            return {
                error : {error},
                status : HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    async ValidateOrDecline(decision : boolean, returnId : string){
        if(decision){
            return this.returnsRepository.update({id : returnId}, {status : "validated"});
        }else {
            return this.returnsRepository.update({id: returnId}, {status: "refused"});
        }
    }   

    async GetAll(): Promise<ReturnsResponseDto[]> {
        const returns: Returns[] = await this.returnsRepository.find();
        console.log(returns);
        return this.BuildReturnsDtoFromReturns(returns);
    }

    // TODO : A TESTER
    async GetAllByUser(userId : string) : Promise<Array<ReturnsResponseDto>>{
        const returns: Returns[] = await this.returnsRepository.find({where : {userId : userId}});
        return this.BuildReturnsDtoFromReturns(returns);
    }

    // TODO : A TESTER
    async GetAllForSeller(orderProductsSeller : Array<string>){
        const allReturns : Array<Returns> = await this.returnsRepository.find();
        const returnsDto : Array<ReturnsResponseDto> = await this.BuildReturnsDtoFromReturns(allReturns);
        const returnsContainingSellerProducts : Array<ReturnsResponseDto> = returnsDto.map((elm : ReturnsResponseDto) => {
            if(elm['orderProducts'].some((product: string) => orderProductsSeller.includes(product))){
                return elm;
            }
        }).filter((elm: ReturnsResponseDto | undefined) => elm !== undefined);
        const result : Array<ReturnsResponseDto> = returnsContainingSellerProducts.map((elm : ReturnsResponseDto) => {
            elm.orderProducts = elm.orderProducts.filter(op => orderProductsSeller.includes(op));
            return elm;
        });
        return result;
    }

    // TODO : A TESTER
    private async BuildReturnsDtoFromReturns(returns : Array<Returns>) : Promise<Array<ReturnsResponseDto>>{
        return Promise.all(returns.map(async (elm: Returns) => {
            return new ReturnsResponseDto(elm.id, elm.reason, elm.getOrderProductIds(), elm.status, elm.userId);
        })); 
    }
}
