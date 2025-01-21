import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder , SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
      




  })
);
   const config = new  DocumentBuilder().setVersion('1.0').build();
   const document = SwaggerModule.createDocument(app,config);
app.listen(3000);
}
bootstrap();
