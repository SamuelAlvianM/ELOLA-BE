/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {

  dotenv.config()
  const app = await NestFactory.create(AppModule, {cors:true});
  const config = new DocumentBuilder()
    .setTitle('NestJS - SaleMate REST API TESTING - BackEnd Team 3')
    .setDescription('We are using NestJS - Restful API for the backend system. Full CRUD and to be tested on this swagger documentation')
    .setVersion('1.0')
    .addTag('SaleMate API Test Documentation')
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
