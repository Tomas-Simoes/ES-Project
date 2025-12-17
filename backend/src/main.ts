import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ✅ log agora já com body parsed
  app.use((req, _res, next) => {
    console.log('REQ', req.method, req.url, 'BODY', req.body);
    next();
  });

  app.enableCors({
    origin: [
      'http://localhost:5173/',  
      'http://localhost:3000/', 
      'https://seu-dominio-frontend.com/'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();

