import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(Address)
        private addressesRepository: Repository<Address>
    ){}

    async GetAddressById(id : string) : Promise<Address> {
        return await this.addressesRepository.findOneBy({id : id})
    }
    
}
