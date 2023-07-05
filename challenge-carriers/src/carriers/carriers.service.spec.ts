import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carriers } from './entity/carriers.entity';
import { CarriersService } from './carriers.service';

describe('CarriersService', () => {
  let carriersService: CarriersService;
  let carriersRepository: Repository<Carriers>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CarriersService,
        {
          provide: getRepositoryToken(Carriers),
          useClass: Repository,
        },
      ],
    }).compile();

    carriersService = moduleRef.get<CarriersService>(CarriersService);
    carriersRepository = moduleRef.get<Repository<Carriers>>(
      getRepositoryToken(Carriers),
    );
  });

  describe('GetCarrierByid', () => {
    it('should return a carrier by id', async () => {

      const carrier = { id: '123456789', name: 'Carrier', fees :10 };

      carriersRepository.findOneBy = jest.fn().mockResolvedValue(carrier);

      const result = await carriersService.GetCarrierByid(carrier.id);

      expect(result).toEqual(carrier);
    });


    it('should throw an HttpException if an error occurs', async () => {
      const carrierId = '123456789';

      carriersRepository.findOne = jest.fn().mockRejectedValue(new Error());

      await expect(carriersService.GetCarrierByid(carrierId)).rejects.toThrow(
        new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error while fetching carrier',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('GetAllCarriers', () => {
    it('should return all carriers', async () => {
      const carriers = [
        { id: '1', name: 'Carrier 1', fees :10 },
        { id: '2', name: 'Carrier 2', fees :10 },
      ];

      carriersRepository.find = jest.fn().mockResolvedValue(carriers);

      const result = await carriersService.GetAllCarriers();

      expect(carriersRepository.find).toHaveBeenCalled();
      expect(result).toEqual(carriers);
    });

    it('should throw an HttpException if an error occurs', async () => {
      carriersRepository.find = jest.fn().mockRejectedValue(new Error());

      await expect(carriersService.GetAllCarriers()).rejects.toThrow(
        new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error while fetching all carriers',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('GetCarrierByIdForOrder', () => {
    it('should return a carrier by id for order', async () => {
      const carrier = { id: '123456789', name: 'Carrier', fees :10 };

      carriersRepository.findOneBy = jest.fn().mockResolvedValue(carrier);

      const result = await carriersService.GetCarrierByIdForOrder(carrier.id);

      expect(carriersRepository.findOneBy).toHaveBeenCalledWith({ id: carrier.id });
      expect(result).toEqual(carrier);
    });

    it('should throw an HttpException if an error occurs', async () => {
      const carrierId = '123456789';

      carriersRepository.findOneBy = jest.fn().mockRejectedValue(new Error());

      await expect(carriersService.GetCarrierByIdForOrder(carrierId)).rejects.toThrow(
        new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error while fetching carrier',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
