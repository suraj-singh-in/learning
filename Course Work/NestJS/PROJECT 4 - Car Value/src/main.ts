// Libraries
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

// Modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(
    cookieSession({
      keys: ['<CHANGE_THIS_STRING_IN_PROD_AS_IT_IS_USED_IN_ENCRYPTION>'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
