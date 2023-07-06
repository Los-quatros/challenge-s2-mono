import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesService } from './addresses.service';
import { AddressesModule } from './addresses.module';
import { Address } from './entity/address.entity';
import { Repository } from 'typeorm';

describe('AddressesService (functional)', () => {
  let app: INestApplication;
  let addressesService: AddressesService;
  let addressesRepository: Repository<Address>;
  let createdaddress: Address;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AddressesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: 'address-db-test', 
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    addressesService = moduleFixture.get<AddressesService>(AddressesService);
    
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
  });

  describe('CreateAddress', () => {
    it('should create a address', async () => {
      const addressDto = { zip: 75012, country: 'france', user_id: 'user-123', street: 'rue de paris', city:'marseille', state: true };

       createdaddress = await addressesService.CreateAddress(addressDto);

      expect(createdaddress).toBeDefined();
    });

  });

  describe('GetUserAddresses', () => {
    it('should get user addresses', async () => {
     
      
      const userAddress = await addressesService.GetUserAddresses(createdaddress.user_id);
      
      expect(userAddress).toBeDefined();
    });
  });

  describe('updateAddress', () => {
    it('should update address', async () => {
     
      const updateAddressDto =
        { zip: 75012, country: 'france', user_id:'user-123', street: 'rue de lens', city:'lille' }
      
      const updatedAddress = await addressesService.ChangeAddress(updateAddressDto,createdaddress.id);
      
      expect(updatedAddress).toBeDefined();
    });
  });


});
