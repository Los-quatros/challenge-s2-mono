import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carriers } from './entity/carriers.entity';
import { Repository } from 'typeorm';
import { CarrierDto } from './models/carrier.dto';

@Injectable()
export class CarriersService {
    constructor(
        @InjectRepository(Carriers)
        private carriersRepository: Repository<Carriers>
    ){}

    async GetCarrierByid(id : string) : Promise<CarrierDto> {
        try {
            return await this.carriersRepository.findOneBy({id : id['id']});
        }catch(error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error while fetching carrier',
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async GetAllCarriers() : Promise<Array<Carriers>> {
        try {
            return await this.carriersRepository.find();
        }catch(error) {
            throw new HttpException({
                status : HttpStatus.INTERNAL_SERVER_ERROR,
                error : "Error while fetching all carriers"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
