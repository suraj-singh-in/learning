// Libraries
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UsersController } from './users.controller';

// Services
import { UsersService } from './users.service';

// Entities
import { AuthService } from './auth.service';
import { User } from './user.entity';

// interceptors
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [AuthService, UsersService, CurrentUserInterceptor],
})
export class UsersModule {}
