import { Injectable } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;

  constructor() {
    this.connectToRabbitMQ();
  }

  private async connectToRabbitMQ() {
    this.connection = await connect('amqp://rabbitmq');
    this.channel = await this.connection.createChannel();

    console.log('Connected to RabbitMQ');
  }

}
