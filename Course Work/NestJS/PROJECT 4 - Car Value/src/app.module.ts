// Libraries
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

// Controllers
import { AppController } from './app.controller';

// Servives
import { AppService } from './app.service';

// Modules
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

// Entities
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Report, User],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['<CHANGE_THIS_STRING_IN_PROD_AS_IT_IS_USED_IN_ENCRYPTION>'],
        }),
      )
      .forRoutes('*');
  }
}
