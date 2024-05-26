import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    // Controller is creating its own dependencies
    // DONT DO THIS ON REAL APPLICATIONS
    this.messagesService = new MessagesService();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }
}
