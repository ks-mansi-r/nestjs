import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';

// import { ConfigService } from '@nestjs/config';
// import * as dotenv from 'dotenv';

// dotenv.config();
// require('dotenv')

console.log(process.env.DATABASE_USER);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);

  // console.log('DATABASE_USER:', configService.get('DATABASE_USER')); 

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform:true,
    transformOptions:{
      enableImplicitConversion: true,
    }

  })
  );
  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('NestJs MasterClass - Blog app API')
    .setDescription('Use api http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .addServer('http://localhost:3000')
    //  .setLicense('MIT License','')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.listen(3000);
}
bootstrap();
