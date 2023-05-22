import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/sellers')
  public async someEndpoint(): Promise<any> {
    const microservice1Response = await this.appService.makeServiceCall('microservice1', '/sellers');

    // Traitez les réponses des microservices

    return {
      microservice1Response,
    };
  }
}