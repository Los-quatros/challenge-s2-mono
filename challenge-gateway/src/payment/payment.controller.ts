import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthenticationRequired, HasRole } from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';

@Controller('payment')
export class PaymentController {

    constructor(readonly paymentService: PaymentService) { }
    
}