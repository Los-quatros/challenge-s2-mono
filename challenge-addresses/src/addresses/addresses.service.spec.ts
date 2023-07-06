import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressesService } from './addresses.service';
import { Address } from './entity/address.entity';
import { CreateAddressDto } from './models/CreateAddressDto';
import { ChangeAddressDto } from './models/ChangeAddressDto';

describe('AddressesService', () => {
  let addressesService: AddressesService;
  let addressesRepository: Repository<Address>;
  let address: Address;


  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AddressesService,
        {
          provide: getRepositoryToken(Address),
          useClass: Repository,
        },
      ],
    }).compile();
    address = {
      id: '123456789',
      zip: 75011,
      country: 'string',
      user_id: '13',
      street: 'string',
      city: 'string',
      state: true,
      orders: '',
    };
    addressesService = moduleRef.get<AddressesService>(AddressesService);
    addressesRepository = moduleRef.get<Repository<Address>>(
      getRepositoryToken(Address),
    );
  
    // Configurer les comportements simulés pour les méthodes du repository
    addressesRepository.findOneBy = jest.fn().mockResolvedValue(address);
    addressesRepository.find = jest.fn().mockResolvedValue([address]);

    
  });

  describe('CreateAddress', () => {
    it('should create an address', async () => {
      const createAddressDto: CreateAddressDto = {
        zip : 75011,
        country : 'string',
        user_id : 'string',
        street : 'string',
        city : 'string',
        state : true,
      };

      const saveSpy = jest.spyOn(addressesRepository, 'save');
      saveSpy.mockResolvedValueOnce({} as Address);

      const result = await addressesService.CreateAddress(createAddressDto);

      expect(saveSpy).toHaveBeenCalledWith(createAddressDto);
      expect(result).toEqual({} as Address);
    });
  });

  describe('GetAddressById', () => {
    it('should return an address by id', async () => {
      
      const result = await addressesService.GetAddressById(address.id);

     
      expect(result).toEqual(address);
    });
  });

  describe('GetUserAddresses', () => {
    it('should return addresses for a user', async () => {
      jest.spyOn(addressesRepository, 'findBy').mockResolvedValue([address]);

      const result = await addressesService.GetUserAddresses(address.user_id);

     
      expect(result).toEqual([address]);
    });
  });

  
});