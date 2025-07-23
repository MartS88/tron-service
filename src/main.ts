// main.ts

// Other packages
import cookieParser from 'cookie-parser';

// Nest js
import {NestFactory} from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import express from 'express';


// Module
import {AppModule} from './app.module';

// Services
import {ConfigService} from '@nestjs/config';

// Winston
import {WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston';

/**
 * Initializes and starts the application.
 * Configures global middleware, Swagger, and application settings.
 */
async function bootstrap() {

  // Initialize app
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // Client
  const origins = configService
    .get<string>('FRONTEND_ORIGIN')
    ?.split(',')
    .map(origin => origin.trim());

  // For nginx or another proxy
  app.set('trust proxy', true);

  // For upload limit
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // Prefix
  app.setGlobalPrefix('/api/v1');

  // Cookies and cors
  app.use(cookieParser());
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    optionsSuccessStatus: 204,
  });

  // Using Winston logger for NestJS system logs
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Using Winston logger for manual logging
  const logger = app.get(Logger);
  const PORT = configService.get<number>('PORT') || 5000;
  const NODE_ENV = configService.get<string>('NODE_ENV')

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes properties that are not defined in the DTO
      forbidNonWhitelisted: true, // throws an error if extra (non-whitelisted) properties are present
      transform: true, // automatically transforms payloads to match the DTO types (e.g., string → number)
    }),
  );

  // App starts
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} in ${NODE_ENV} regime at ${new Date()}`)
  });

}

bootstrap();

