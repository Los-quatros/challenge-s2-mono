import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { response } from 'express';


@Injectable()
export class AppService {
  private readonly httpServices: Record<string, AxiosInstance>;

  constructor() {
    this.httpServices = {
      microservice1: axios.create({
        baseURL: 'http://localhost:3006',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      microservice2: axios.create({
        baseURL: 'http://localhost:3002',
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      // Ajoutez d'autres microservices avec leurs URL correspondantes
    };
  }

  // Utilisez cette méthode pour effectuer des appels à un microservice spécifique
  public async makeServiceCall(microserviceName: string, endpoint: string): Promise<any> {
    const httpService = this.httpServices[microserviceName];

    if (!httpService) {
      throw new Error(`Microservice '${microserviceName}' non configuré.`);
    }

    try {
      const response = await httpService.get(endpoint);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
}
