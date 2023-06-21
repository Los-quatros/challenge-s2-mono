
import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Module({

  providers: [PaymentsService,RabbitMQService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
