// Libraries
import { Body, Controller, Post } from '@nestjs/common';

// DTOs
import { createUserDto } from './dtos/create-user.dto';

// Services
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    this.usersService.create(body.email, body.password);
  }
}
