import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return [];
  }

  @Get('/:id')
  getMessage() {}

  @Post()
  createMessage() {}
}
