import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Carriers } from "./entity/carriers.entity";
import { Repository } from "typeorm";
import { CarrierDto } from "./models/carrier.dto";

@Injectable()
export class CarriersService {
  constructor(
    @InjectRepository(Carriers)
    private carriersRepository: Repository<Carriers>
  ) {}

  async GetCarrierByid(id: string): Promise<any> {
    try {
      return await this.carriersRepository.findOneBy({ id: id["id"] });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while fetching carrier",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async GetAllCarriers(): Promise<Array<Carriers>> {
    try {
      return await this.carriersRepository.find({ where: { isActive: true } });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while fetching all carriers",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async GetAllCarriersForAdmin(): Promise<Array<Carriers>> {
    try {
      return await this.carriersRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while fetching all carriers",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async GetCarrierByIdForOrder(id: string): Promise<any> {
    try {
      return await this.carriersRepository.findOneBy({ id: id });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while fetching carrier",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async CreateCarrier(carrierDto: CarrierDto): Promise<Carriers | any> {
    try {
      return await this.carriersRepository.save(carrierDto);
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Error while creating carrier",
      };
    }
  }

  async UpdateCarrier(carrierDto: CarrierDto): Promise<Carriers> {
    try {
      const carrier = await this.carriersRepository.findOneBy({
        id: carrierDto.id,
      });
      const updatedCarrier = Object.assign(carrier, carrierDto);
      return await this.carriersRepository.save(updatedCarrier);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while updating carrier",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
