import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReturnDto } from './models/CreateReturnDto';
import { ReturnsResponseDto } from './models/ReturnsResponseDto';
import { ReturnsService } from './returns.service';
import {
  AuthenticationRequired,
  HasRole,
} from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';

@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Post('/users/:id')
  async CreateReturn(
    @Body(new ValidationPipe({ transform: true }))
    createReturnDto: CreateReturnDto,
    @Param() userId: string,
  ) {
    return this.returnsService.CreateReturn(createReturnDto, userId);
  }

  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Post('/:id/moderate')
  async ModerateReturn(@Body() decision: boolean, @Param() idReturn: string) {
    return this.returnsService.ModerateReturn(
      decision['decision'],
      idReturn['id'],
    );
  }

  // TODO : PRODUCT
  @AuthenticationRequired()
  @HasRole(Role.ADMINISTRATOR)
  @Get()
  async GetAllReturns(): Promise<Array<ReturnsResponseDto>> {
    return await this.returnsService.GetAll();
  }

  // TODO : PRODUCT
  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Get('/users/:id')
  async GetUserReturns(
    @Param() id: string,
  ): Promise<Array<ReturnsResponseDto>> {
    return await this.returnsService.GetAllByUser(id['id']);
  }

  // TODO : PRODUCT
  @AuthenticationRequired()
  @HasRole(Role.SELLER)
  @Get('sellers/:id')
  async GetReturnsBySellerSales(@Param() id: string) {
    return await this.returnsService.GetAllBySales(id['id']);
  }
}
