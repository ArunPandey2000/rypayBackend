import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const API_DEFAULT_PORT = Number(process.env.PORT ?? 3000);
  const config = new DocumentBuilder()
    .setTitle('RyPay')
    .setDescription('RyPay Endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(
    new ValidationPipe({ forbidUnknownValues: false, transform: true }),
  );
  app.enableCors();
  app.use(json());
  app.use(helmet());
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
