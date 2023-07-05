import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateReturnModel } from 'src/models/CreateReturnModel';
import { ReturnsResponseDto } from 'src/models/ReturnsResponseDto';
import { ReturnsService } from './returns.service';

@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}
  @EventPattern('CreateReturn')
  async CreateReturn(
    @Payload() createReturnModel: CreateReturnModel,
    @Payload() userId: string,
  ) {
    return this.returnsService.Cretae(
      createReturnModel['retrunDto'],
      userId['userId'],
    );
  }

  @EventPattern('AcceptOrDeclineReturn')
  async ModerateReturn(@Payload() data: any) {
    return this.returnsService.ValidateOrDecline(
      data['decision'],
      data['returnId'],
    );
  }

  @EventPattern('GetAllReturns')
  async GelAllReturns(): Promise<Array<ReturnsResponseDto>> {
    return this.returnsService.GetAll();
  }

  // TODO : A TESTER
  @EventPattern('GetReturnsByUser')
  async GetAllReturnsByUser(@Payload() userId: string) {
    return this.returnsService.GetAllByUser(userId['id']);
  }

  @EventPattern('GetReturnsWithSales')
  async GetAllReturnsWithSellerSales(@Payload() salesIds: Array<string>) {
    return this.returnsService.GetAllForSeller(salesIds['orderProducts']);
  }
}
