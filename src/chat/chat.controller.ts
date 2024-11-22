import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AtGuard } from 'src/common/guards/at.guard';

@Controller('gemini')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('text')
  @UseGuards(AtGuard)
  generateText(@Body() dto: any): any {
    return this.chatService.startChat(dto.prompt);
  }

  @Post('chats')
  @UseGuards(AtGuard)
  getUserChats(@Body() dto: any): any {
    return this.chatService.allChats(dto.uid);
  }

  @Get('chat/:uid')
  @UseGuards(AtGuard)
  getChat(@Param() params): any {
    return this.chatService.getChat(params.uid);
  }

  @UseGuards(AtGuard)
  @Post('chat/create')
  createChat(@Body() dto): any {
    return this.chatService.newChat(dto.name);
  }
}
