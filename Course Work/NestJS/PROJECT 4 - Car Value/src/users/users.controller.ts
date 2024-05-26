// Libraries
import { Body, Controller, Post } from '@nestjs/common';

// DTOs
import { createUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    console.log(body);
  }
}
