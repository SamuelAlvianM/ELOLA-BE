/* eslint-disable prettier/prettier */
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Timezone_Interceptor } from './utils/interceptors/timezone.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {

  dotenv.config()

  const app = await NestFactory.create(AppModule, {cors:true});
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new Timezone_Interceptor());
  
  const config = new DocumentBuilder()
    .setTitle('NestJS - ELOLA REST API TESTING')
    .setDescription('We are using NestJS as framework for this project. Built a Restful API for the backend system. All services are documented  in this swagger documentation. We provide all serivces so the frontend can maximize performance for our applications')
    .setVersion('1.0')
    .addTag('ELOLA RESTFUL API Documentation')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },'JWT')
    .build();

    const documents = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documents);
  await app.listen(3000);
}
bootstrap();
