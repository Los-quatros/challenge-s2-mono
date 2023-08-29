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
    private addressesRepository: Repository<Address>,
  ) {}

  async CreateAddress(data: CreateAddressDto) {
    return await this.addressesRepository.save(data);
  }

  async GetAddressById(id: string): Promise<Address> {
    const test = await this.addressesRepository.findOneBy({ id: id['id'] });
    console.log(test, 'TEST');
    return await this.addressesRepository.findOneBy({ id: id['id'] });
  }

  async GetUserAddresses(id: string): Promise<Array<Address>> {
    return await this.addressesRepository.findBy({
      user_id: id['id'],
      state: true,
    });
  }

  async DeleteAddressById(id: string) {
    return await this.addressesRepository.update(
      { id: id['id'] },
      { state: false },
    );
  }

  async ChangeAddress(data: ChangeAddressDto, idAddress: string) {
    return await this.addressesRepository.update(
      { id: idAddress['id'] },
      {
        user_id: data['user_id'],
        city: data['city'],
        country: data['country'],
        zip: data['zip'],
        street: data['street'],
      },
    );
  }
}
