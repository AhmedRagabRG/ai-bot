import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';

@Controller('gemini')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('text')
  generateText(@Body() dto: any): any {
    return this.chatService.startChat(dto.prompt);
  }

  @Post('chats')
  getUserChats(@Body() dto: any): any {
    return this.chatService.allChats(dto.id);
  }

  @Get('chat/:id')
  getChat(@Param() params): any {
    return this.chatService.getChat(+params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('chat/create')
  createChat(@Body() dto): any {
    return this.chatService.newChat(dto.name);
  }
}
