import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarriersService } from './carriers.service';
import { CarriersModule } from './carriers.module';
import { Carriers } from './entity/carriers.entity';
import { Repository } from 'typeorm';

describe('CarriersService (functional)', () => {
  let app: INestApplication;
  let carriersService: CarriersService;
  let carriersRepository: Repository<Carriers>;
  let createdCarrier: Carriers;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CarriersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'carrier-db-test',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'carrier-db-test', 
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    carriersService = moduleFixture.get<CarriersService>(CarriersService);
    carriersRepository = moduleFixture.get<Repository<Carriers>>(
      'CarriersRepository', 
    );
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await carriersRepository.clear(); 
  });

  describe('CreateCarrier', () => {
    it('should create a carrier', async () => {
      const carrierDto = { name: 'Test Carrier', fees: 10, isActive: true };

      const createdCarrier = await carriersService.CreateCarrier(carrierDto);

      expect(createdCarrier).toBeDefined();
      expect(createdCarrier.name).toEqual(carrierDto.name);
    });

  });

  describe('GetAllCarriers', () => {
    it('should return all active carriers', async () => {
      const carriers = await carriersService.GetAllCarriers();

      expect(carriers).toBeDefined();
      expect(carriers.length).toBeGreaterThan(0);
      expect(carriers[0].isActive).toBe(true);
    });

    it('should return an empty array if no active carriers found', async () => {
      await carriersRepository.update({ id: createdCarrier.id }, { isActive: false });

      const carriers = await carriersService.GetAllCarriers();

      expect(carriers).toBeDefined();
      expect(carriers.length).toBe(0);
    });
  });

  describe('GetCarrierByid', () => {
    it('should return the carrier with the specified id', async () => {
      const carrier = await carriersService.GetCarrierByid(createdCarrier.id);

      expect(carrier).toBeDefined();
      expect(carrier.id).toEqual(createdCarrier.id);
    });

    it('should throw an error if carrier is not found', async () => {
      const invalidId = 'invalid-id';

      await expect(carriersService.GetCarrierByid(invalidId)).rejects.toThrow();
    });
  });

  

});
