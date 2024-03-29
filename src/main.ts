import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@rabbitmq:5672'],
      queue: 'students_certifications_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@rabbitmq:5672'],
      queue: 'courses_certifications_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@rabbitmq:5672'],
      queue: 'certifications_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();
