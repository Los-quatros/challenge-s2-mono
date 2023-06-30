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

  @Post('/checkout')
  async createCheckout() {
    return await this.paymentService.createCheckoutSession();
  }
}
