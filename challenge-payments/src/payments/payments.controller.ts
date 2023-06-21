import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Param,
    Patch,
    UseGuards,
    UnauthorizedException,
    BadRequestException,
    Req
  } from '@nestjs/common';
import { PaymentsService } from './payments.service';

  
@Controller('payments')


export class PaymentsController {
    
}