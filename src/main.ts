import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { ValidationExceptionFilter } from './core/filters/exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const API_DEFAULT_PORT = Number(process.env.PORT ?? 3000);
  const config = new DocumentBuilder()
    .setTitle('RyPay')
    .setDescription('RyPay Endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true }),
  );
  app.useGlobalFilters(new ValidationExceptionFilter())
  app.enableCors();
  app.use(json());
  app.use(helmet());
  SwaggerModule.setup('api', app, document);
  const logger = app.get(Logger);
  await app.listen(API_DEFAULT_PORT).then(() => {
    logger.log('server started');
  });
}
bootstrap();
