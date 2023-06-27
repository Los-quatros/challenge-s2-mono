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

    await this.channel.assertQueue('sessionId_events_queue', { durable: true });
    await this.channel.assertQueue('paid_events_queue', { durable: true });

    console.log('Connected to RabbitMQ');
  }

  async publishSessionIdEvent(event: any) {
    await this.channel.sendToQueue(
      'sessionId_events_queue',
      Buffer.from(JSON.stringify(event)),
      { persistent: true }
    );

    console.log('SessionId event published to RabbitMQ');
  }

  async publishPaidEvent(event: any) {
    await this.channel.sendToQueue(
      'paid_events_queue',
      Buffer.from(JSON.stringify(event)),
      { persistent: true }
    );
    
    console.log('paid event published to RabbitMQ');
  }
}
