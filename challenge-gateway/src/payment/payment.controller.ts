import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  AuthenticationRequired,
  HasRole,
} from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';
import { lastValueFrom } from 'rxjs';
@Controller('payment')
export class PaymentController {
  constructor(readonly paymentService: PaymentService) {}

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Post('/checkout')
  async createCheckout(@Body() data :any) {
    return await this.paymentService.createCheckoutSession(data['idorder']);
  }

  @AuthenticationRequired()
  @HasRole(Role.USER)
  @Post('/success/:idOrder')
  async paymentValidated(@Param() idOrder : string){
    return await this.paymentService.paymentValidated(idOrder);
  }

}
