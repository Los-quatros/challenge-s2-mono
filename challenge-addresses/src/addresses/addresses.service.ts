import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './models/CreateAddressDto';
import { ChangeAddressDto } from './models/ChangeAddressDto';

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(Address)
        private addressesRepository: Repository<Address>
    ){}

    async CreateAddress(data : CreateAddressDto) {
        return await this.addressesRepository.save(data)
    }

    async GetAddressById(id : string) : Promise<Address> {
        return await this.addressesRepository.findOneBy({id : id})
    }

    async GetUserAddresses(id : string) : Promise<Array<Address>> {
        return await this.addressesRepository.findBy({user_id : id})
    }

    async DeleteAddressById(id : string) {
        return await this.addressesRepository.delete({ id : id })
    }

    async ChangeAddress(data : ChangeAddressDto) {
        return await this.addressesRepository.update({id : data.id}, {user_id : data.user_id, city : data?.city, country : data?.country, zip : data?.zip, street : data.street})
    }
    
}
