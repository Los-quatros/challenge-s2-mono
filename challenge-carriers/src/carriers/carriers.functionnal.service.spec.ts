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
          host: process.env.DB_HOST,
          port: 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
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
  });

  describe('CreateCarrier', () => {
    it('should create a carrier', async () => {
      const carrierDto = { name: 'Test Carrier', fees: 10, isActive: true };

      createdCarrier = await carriersService.CreateCarrier(carrierDto);

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

   
  });

  describe('GetCarrierByid', () => {
    it('should return the carrier with the specified id', async () => {
      const carrier = await carriersService.GetCarrierByid(createdCarrier.id);

      expect(carrier).toBeDefined();
    });

  });
  
});
